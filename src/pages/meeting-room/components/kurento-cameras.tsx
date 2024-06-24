// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useRef, useState } from 'react';
import { TGroupMemberFetchRes } from '@api/group/group-request.type';
import { TUserInfoRes } from '@api/user/user-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useUpdateMeetingEndDate } from '@hooks/react-query/use-query-meeting';
import useThrottle from '@hooks/use-throttle';
import Participant from '@pages/meeting-room/kurento/participant';
import { useGroupStore } from '@stores/group';
import { useQueryClient } from '@tanstack/react-query';
import { playSound } from '@utils/play-sound';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '@pages/meeting-room/kurento/participants.css';
import ForceQuitToast from './force-quit-toast';
import { ROOM_BUTTONS } from '../constants';
import useForceQuitToast from '../hooks/use-force-quit-toast';
import useMeetingRoomTimer from '../hooks/use-meeting-room-timer';
import { getIceServers } from '../utils/get-ice-servers';

interface TKurentoCamerasProps {
  roomId: number;
  startDate: string;
  endDate: string;
}

const KurentoCameras = ({ roomId, startDate, endDate }: TKurentoCamerasProps) => {
  const { isToastOpen, handleToastChange, isToastAnimClose, handleToastClose } = useForceQuitToast();

  const [isVideo, setIsVideo] = useState(true);
  const [isAudio, setIsAudio] = useState(true);
  const [cameraCount, setCameraCount] = useState(0);

  const navigate = useNavigate();
  const userInfo = useQueryClient().getQueryData<TUserInfoRes>([QUERY_KEY.userInfo]);
  const groupInfo = useQueryClient().getQueryData<TGroupMemberFetchRes>([
    QUERY_KEY.groupInfo,
    useGroupStore((state) => state.groupId),
  ]);
  const groupId = useGroupStore((state) => state.groupId);
  const userId = userInfo?.id;
  const memberList = groupInfo?.memberList;
  const meetingEndDateMutation = useUpdateMeetingEndDate(groupId, roomId);

  const ws = useRef(null);
  const heartbeatInterval = useRef(null);
  const participants = useRef({});

  const { isDurationOver } = useMeetingRoomTimer(startDate, endDate);

  useEffect(() => {
    if (cameraCount === 1 && isDurationOver) {
      handleToastChange(true);
      setTimeout(leaveRoom, 500000);
    }
  }, [cameraCount, isDurationOver, handleToastChange]);

  useEffect(() => {
    if (isToastOpen && cameraCount !== 1) handleToastClose();
  }, [cameraCount, isToastOpen, handleToastClose]);

  useEffect(() => {
    ws.current = new WebSocket('https://api.effi.club/signal/webrtc');
    ws.current.onopen = function () {
      setTimeout(() => playSound('enterRoom'), 100);
      heartbeatInterval.current = setInterval(() => {
        if (ws.current.readyState === WebSocket.OPEN) {
          const message = {
            id: 'ping',
          };
          sendMessage(message);
        }
      }, 30000);

      const message = {
        id: 'connect',
        userId: userId,
        roomId: roomId,
      };
      sendMessage(message);
    };
    ws.current.onclose = function () {
      clearInterval(heartbeatInterval.current);
    };
    ws.current.onmessage = function (message) {
      const parsedMessage = JSON.parse(message.data);
      switch (parsedMessage.id) {
        case 'existingPeers':
          onExistingParticipants(parsedMessage);
          break;
        case 'newPeerArrived':
          onNewParticipant(parsedMessage);
          break;
        case 'receiveVideoAnswer':
          receiveVideoResponse(parsedMessage);
          break;
        case 'iceCandidate':
          participants.current[parsedMessage.userId].rtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
            if (error) {
              console.error('Error adding candidate: ' + error);
              return;
            }
          });
          break;
        case 'peerDisconnect':
          onParticipantLeft(parsedMessage);
          break;
        case 'onHandleDevice':
          onHandleDevice(parsedMessage);
          break;
        case 'pong':
          break;
        default:
          console.error('Unrecognized message', parsedMessage);
      }
    };
    return () => {
      if (ws.current) {
        ws.current.close();
      }
      clearInterval(heartbeatInterval.current);
    };
  }, []);

  const onNewParticipant = (request) => {
    receiveVideo(parseInt(request.userId));
    playSound('enterRoom');
  };

  const receiveVideoResponse = (result) => {
    participants.current[result.sender].rtcPeer.processAnswer(result.sdpAnswer, function (error) {
      if (error) return console.error(error);
    });
  };

  async function onExistingParticipants(msg) {
    const constraints = {
      video: {
        width: 1280,
        frameRate: 40,
      },
      audio: {
        autoGainControl: true,
        channelCount: 2,
        echoCancellation: true,
        latency: 0,
        noiseSuppression: true,
        sampleRate: 48000,
        sampleSize: 16,
        volume: 0.5,
      },
    };

    const participant = new Participant(userId, userInfo, sendMessage);

    participants.current[userId] = participant;

    const video = participant.getVideoElement();

    const { turnIpAddress, turnPort, turnServerId, turnServerPassword } = await getIceServers();

    const newIceServersInfo = [
      {
        urls: `turn:${turnIpAddress}:${turnPort}?transport=tcp`,
        username: turnServerId,
        credential: turnServerPassword,
      },
    ];

    const options = {
      localVideo: video,
      mediaConstraints: constraints,
      onicecandidate: participant.onIceCandidate.bind(participant),
      configuration: {
        iceServers: newIceServersInfo,
      },
    };

    participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
      if (error) {
        return console.error(error);
      }
      this.generateOffer(participant.offerToReceiveVideo.bind(participant));
    });

    msg.userIdList.forEach((item) => {
      receiveVideo(item);
    });

    setCameraCount(Object.keys(participants.current).length);
  }

  async function leaveRoom() {
    if (cameraCount === 1 && isDurationOver) {
      const currentDateTime = new Date();
      currentDateTime.setHours(currentDateTime.getHours() + 9);
      const isoDateTime = currentDateTime.toISOString();
      await meetingEndDateMutation.mutateAsync(isoDateTime);
    }
    sendMessage({
      id: 'disconnect',
      userId: userId,
    });
    localStorage.setItem('isFromMeeting', 'true');
    navigate('/group-home');
  }

  async function receiveVideo(sender) {
    const senderInfo = memberList?.find((item) => item.id === sender);

    const participant = new Participant(sender, senderInfo, sendMessage);

    participants.current[sender] = participant;
    const video = participant.getVideoElement();

    const { turnIpAddress, turnPort, turnServerId, turnServerPassword } = await getIceServers();

    const newIceServersInfo = [
      {
        urls: `turn:${turnIpAddress}:${turnPort}?transport=tcp`,
        username: turnServerId,
        credential: turnServerPassword,
      },
    ];

    const options = {
      remoteVideo: video,
      onicecandidate: participant.onIceCandidate.bind(participant),
      configuration: {
        iceServers: newIceServersInfo,
      },
    };

    participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
      if (error) {
        return console.error(error);
      }
      this.generateOffer(participant.offerToReceiveVideo.bind(participant));
    });

    setCameraCount(Object.keys(participants.current).length);
  }

  function onParticipantLeft(request) {
    const participant = participants.current[request.userId];
    participant.dispose();
    delete participants.current[request.userId];
    setCameraCount(Object.keys(participants.current).length);
    playSound('leaveRoom');
  }

  function sendMessage(message) {
    const jsonMessage = JSON.stringify(message);
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(jsonMessage);
    }
  }

  function localVideoToggle() {
    const dummyContainer = document.getElementById(`dummy-${userInfo.id}`);

    const videoTrack = participants.current[userId].rtcPeer
      .getLocalStream()
      .getTracks()
      .filter((track) => track.kind === 'video')[0];

    if (isVideo) {
      videoTrack.enabled = false;
      setIsVideo(false);
      dummyContainer.style.opacity = 1;

      sendMessage({
        id: 'handleDevice',
        type: 'camera',
        userId: userId,
        roomId: roomId,
        isOn: false,
      });
    } else {
      videoTrack.enabled = true;
      setIsVideo(true);
      dummyContainer.style.opacity = 0;

      sendMessage({
        id: 'handleDevice',
        type: 'camera',
        userId: userId,
        roomId: roomId,
        isOn: true,
      });
    }
  }

  function localAudioToggle() {
    const myMuteIcon = document.getElementById(`muteIcon-${userInfo.id}`);

    const audioTrack = participants.current[userId].rtcPeer
      .getLocalStream()
      .getTracks()
      .filter((track) => track.kind === 'audio')[0];

    if (isAudio) {
      playSound('audioMute');
      audioTrack.enabled = false;
      setIsAudio(false);
      myMuteIcon.style.opacity = 1;

      sendMessage({
        id: 'handleDevice',
        type: 'mic',
        userId: userId,
        roomId: roomId,
        isOn: false,
      });
    } else {
      playSound('audioUnmute');
      audioTrack.enabled = true;
      setIsAudio(true);
      myMuteIcon.style.opacity = 0;

      sendMessage({
        id: 'handleDevice',
        type: 'mic',
        userId: userId,
        roomId: roomId,
        isOn: true,
      });
    }
  }

  const handleVideoButtonClick = useThrottle(localVideoToggle, 500);

  function onHandleDevice(data) {
    if (userInfo.id === data.userId) return;

    if (data.type === 'camera') {
      const dummyContainer = document.getElementById(`dummy-${data.userId}`);
      if (dummyContainer) {
        if (data.isOn) {
          dummyContainer.style.opacity = 0;
        } else {
          dummyContainer.style.opacity = 1;
        }
      } else {
        console.error('상대방의 데이터를 받아오는데 실패했습니다.');
      }
    } else {
      const muteIconElement = document.getElementById(`muteIcon-${data.userId}`);
      if (muteIconElement) {
        if (data.isOn) {
          muteIconElement.style.opacity = 0;
        } else {
          muteIconElement.style.opacity = 1;
        }
      } else {
        console.error('상대방의 데이터를 받아오는데 실패했습니다.');
      }
    }
  }

  window.onbeforeunload = function () {
    leaveRoom();
  };

  return (
    <>
      <S.RoomCameraContainer>
        <ForceQuitToast isToastOpen={isToastOpen} isToastAnimClose={isToastAnimClose} />
        <div className="participants" data-count={cameraCount}></div>
      </S.RoomCameraContainer>

      <S.RoomButtonContainer className="room-button-container">
        <S.RoomButton onClick={handleVideoButtonClick} $isActive={isVideo}>
          <S.Img src={isVideo ? ROOM_BUTTONS[0].changedImg : ROOM_BUTTONS[0].initialImg} />
        </S.RoomButton>
        <S.RoomButton onClick={localAudioToggle} $isActive={isAudio}>
          <S.Img src={isAudio ? ROOM_BUTTONS[1].changedImg : ROOM_BUTTONS[1].initialImg} />
        </S.RoomButton>
        <S.LeaveRoomButton onClick={leaveRoom}>
          <S.Img src={ROOM_BUTTONS[2].initialImg} />
        </S.LeaveRoomButton>
      </S.RoomButtonContainer>
    </>
  );
};

export default KurentoCameras;

const S = {
  RoomCameraContainer: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 20px;
    min-width: 600px;
  `,

  RoomButtonContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 34px;
    padding: 20px;
    visibility: hidden;
    opacity: 0;
    transition:
      visibility 0.3s,
      opacity 0.3s;
    position: absolute;
    bottom: 0;
    z-index: 10;
  `,

  RoomButton: styled.button<{ $isActive: boolean }>`
    width: 60px;
    height: 60px;
    background: ${(props) => (props.$isActive ? 'var(--white)' : '#4d4f4e')};
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Img: styled.img`
    width: 20px;
    height: 20px;
  `,

  LeaveRoomButton: styled.button`
    width: 60px;
    height: 60px;
    background: var(--red01);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
