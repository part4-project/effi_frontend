// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useRef, useState } from 'react';
import { TUserInfoRes } from '@api/user/user-request.type';
import { QUERY_KEY } from '@constants/query-key';
import Participant from '@pages/meeting-room/kurento/participant';
import { useGroupStore } from '@stores/group';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '@pages/meeting-room/kurento/participants.css';
import { ROOM_BUTTONS } from '../constants';
import { getIceServers } from '../utils/get-ice-servers';
import { TGroupMemberFetchRes } from '@api/group/group-request.type';

const KurentoCameras = () => {
  const [isVideo, setIsVideo] = useState(true);
  const [isAudio, setIsAudio] = useState(true);
  const [cameraCount, setCameraCount] = useState(0);
  const navigate = useNavigate();
  const userInfo = useQueryClient().getQueryData<TUserInfoRes>([QUERY_KEY.userInfo]);
  const groupInfo = useQueryClient().getQueryData<TGroupMemberFetchRes>([
    QUERY_KEY.groupInfo,
    useGroupStore((state) => state.groupId),
  ]);

  const userId = userInfo?.id;
  const roomId = 111190;
  const memberList = groupInfo?.memberList;

  const ws = useRef(null);
  const heartbeatInterval = useRef(null);
  const participants = useRef({});

  useEffect(() => {
    ws.current = new WebSocket('https://api.effi.club/signal/webrtc');
    ws.current.onopen = function () {
      // console.log('WebSocket connection opened.');

      // heart beating
      heartbeatInterval.current = setInterval(() => {
        if (ws.current.readyState === WebSocket.OPEN) {
          const message = {
            id: 'ping',
          };
          sendMessage(message);
          // console.log('Sent heartbeat');
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
      // console.log('WebSocket connection closed.');
      clearInterval(heartbeatInterval.current);
    };
    ws.current.onmessage = function (message) {
      const parsedMessage = JSON.parse(message.data);
      // console.info('Received message: ' + message.data);

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
  };

  const receiveVideoResponse = (result) => {
    participants.current[result.sender].rtcPeer.processAnswer(
      result.sdpAnswer, // 원격 참가자로부터 받은 SDP 응답
      function (error) {
        if (error) return console.error(error);
      },
    );
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

  function leaveRoom() {
    sendMessage({
      id: 'disconnect',
      userId: userId,
    });
    navigate('/group-home');
    window.location.reload();
  }

  async function receiveVideo(sender) {
    const senderInfo = memberList?.find((item) => item.id === sender);

    const participant = new Participant(sender, senderInfo, sendMessage); // 발신자(비디오를 보낼 참가자)에 대한 새로운 인스턴스 생성

    participants.current[sender] = participant; // 발신자 이름을 키로 사용하여 참가자 개체를 participants 객체에 저장
    const video = participant.getVideoElement(); // 참가자와 연결된 비디오 요소를 검색

    const { turnIpAddress, turnPort, turnServerId, turnServerPassword } = await getIceServers();

    const newIceServersInfo = [
      {
        urls: `turn:${turnIpAddress}:${turnPort}?transport=tcp`,
        username: turnServerId,
        credential: turnServerPassword,
      },
    ];

    const options = {
      remoteVideo: video, // 수신된 비디오 스트림이 video 요소에서 렌더링되도록 설정
      onicecandidate: participant.onIceCandidate.bind(participant),
      configuration: {
        iceServers: newIceServersInfo,
      }, // 참가자가 생성한 ICE 후보를 처리하기 위한 콜백 함수를 지정
    };

    participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
      // 비디오 수신 전용(WebRtcPeerRecvonly)을 위해 WebRTC 피어 초기화
      if (error) {
        return console.error(error);
      }
      // 피어에서 generateOffer를 호출하여 SDP 제안 프로세스를 시작
      this.generateOffer(participant.offerToReceiveVideo.bind(participant));
    });

    setCameraCount(Object.keys(participants.current).length);
  }

  function onParticipantLeft(request) {
    console.log('Participant ' + request.userId + ' left');
    const participant = participants.current[request.userId];
    participant.dispose();
    delete participants.current[request.userId];
    setCameraCount(Object.keys(participants.current).length);
  }

  function sendMessage(message) {
    const jsonMessage = JSON.stringify(message);
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(jsonMessage);
    }
  }

  function localVideoToggle() {
    const myProfileImage = document.getElementById(`profile-${userInfo.id}`);

    const videoTrack = participants.current[userId].rtcPeer
      .getLocalStream()
      .getTracks()
      .filter((track) => track.kind === 'video')[0];

    if (isVideo) {
      videoTrack.enabled = false;
      setIsVideo(false);
      console.log('Video Off');

      myProfileImage.style.opacity = 1;

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
      console.log('Video On');
      myProfileImage.style.opacity = 0;

      sendMessage({
        id: 'handleDevice',
        type: 'camera',
        userId: userId,
        roomId: roomId,
        isOn: true,
      });
    }

    console.log(participants.current);
  }

  function localAudioToggle() {
    const myMuteIcon = document.getElementById(`muteIcon-${userInfo.id}`);

    const audioTrack = participants.current[userId].rtcPeer
      .getLocalStream()
      .getTracks()
      .filter((track) => track.kind === 'audio')[0];

    if (isAudio) {
      audioTrack.enabled = false;
      setIsAudio(false);
      console.log('Audio Off');

      myMuteIcon.style.opacity = 1;

      sendMessage({
        id: 'handleDevice',
        type: 'mic',
        userId: userId,
        roomId: roomId,
        isOn: false,
      });
    } else {
      audioTrack.enabled = true;
      setIsAudio(true);
      console.log('Audio On');

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

  function onHandleDevice(data) {
    if (userInfo.id === data.userId) return;

    if (data.type === 'camera') {
      const profileImageElement = document.getElementById(`profile-${data.userId}`);
      if (profileImageElement) {
        if (data.isOn) {
          profileImageElement.style.opacity = 0;
        } else {
          profileImageElement.style.opacity = 1;
        }
      } else {
        console.error('상대방의 데이터를 받아오는데 실패했습니다.');
      }
    } else {
      const muteIconElement = document.getElementById(`muteIcon-${data.userId}`);
      if (muteIconElement) {
        console.log(muteIconElement);
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

  return (
    <>
      <h1 style={{ color: 'var(--blue01)' }}>{cameraCount}</h1>
      <S.RoomCameraContainer>
        <div className="participants" data-count={cameraCount}></div>
      </S.RoomCameraContainer>
      <S.RoomButtonContainer className="room-button-container">
        <S.RoomButton onClick={localVideoToggle}>
          <S.Img src={isVideo ? ROOM_BUTTONS[0].changedImg : ROOM_BUTTONS[0].initialImg} />
        </S.RoomButton>
        <S.RoomButton onClick={localAudioToggle}>
          <S.Img src={isAudio ? ROOM_BUTTONS[1].changedImg : ROOM_BUTTONS[1].initialImg} />
        </S.RoomButton>
        <S.RoomButton onClick={leaveRoom}>
          <S.Img src={ROOM_BUTTONS[2].initialImg} />
        </S.RoomButton>
      </S.RoomButtonContainer>
    </>
  );
};

export default KurentoCameras;

const S = {
  RoomCameraContainer: styled.div`
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
  `,

  RoomButton: styled.button`
    width: 80px;
    height: 80px;
    background: #4d4f4e;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Img: styled.img`
    width: 50px;
    height: 50px;
  `,
};
