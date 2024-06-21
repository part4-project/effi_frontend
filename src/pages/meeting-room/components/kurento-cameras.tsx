// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useRef, useState } from 'react';
import { TUserInfoRes } from '@api/user/user-request.type';
import { QUERY_KEY } from '@constants/query-key';
import Participant from '@pages/kurento-service/utils/kurento-service';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const KurentoCameras = () => {
  const navigate = useNavigate();
  const userInfo = useQueryClient().getQueryData<TUserInfoRes>([QUERY_KEY.userInfo]);

  const userId = userInfo.id;
  const roomId = 1231231336025;

  const ws = useRef(null);
  const heartbeatInterval = useRef(null);
  // const participants = {};
  const [participants, setParticipants] = useState({});
  const [cameraCount, setCameraCount] = useState(0);

  const participantElementsRef = useRef(null);

  useEffect(() => {
    const participantsContainer = participantElementsRef.current;
    setCameraCount(Object.keys(participants).length);
    participantsContainer.className = `participants participants-${cameraCount}`;
  }, [cameraCount, participants]);

  useEffect(() => {
    ws.current = new WebSocket('https://api.effi.club/signal/webrtc');
    ws.current.onopen = function () {
      console.log('WebSocket connection opened.');

      // heart beating
      heartbeatInterval.current = setInterval(() => {
        if (ws.current.readyState === WebSocket.OPEN) {
          const message = {
            id: 'ping',
          };
          sendMessage(message);
          console.log('Sent heartbeat');
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
      console.log('WebSocket connection closed.');
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
          participants[parsedMessage.userId]?.rtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
            if (error) {
              console.error('Error adding candidate: ' + error);
              return;
            }
          });
          break;
        case 'peerDisconnect':
          onParticipantLeft(parsedMessage);
          break;
        default:
          console.error('Unrecognized message', parsedMessage);
      }
    };
    return () => {
      if (ws.current) {
        ws.current.close();
        console.log('닫힘!!!!');
      }
      clearInterval(heartbeatInterval.current);
    };
  }, []);

  const onNewParticipant = (request) => {
    receiveVideo(parseInt(request.userId));
  };

  const receiveVideoResponse = (result) => {
    participants[result.sender]?.rtcPeer.processAnswer(
      result.sdpAnswer, // 원격 참가자로부터 받은 SDP 응답
      function (error) {
        if (error) return console.error(error);
      },
    );
  };

  function onExistingParticipants(msg) {
    const constraints = {
      video: {
        width: 1280, // 해상도
        frameRate: 40, // 프레임
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

    const participant = new Participant(userId, sendMessage);

    setParticipants((prevParticipants) => ({
      ...prevParticipants,
      [userId]: participant,
    }));
    const video = participant.getVideoElement();

    const options = {
      localVideo: video,
      mediaConstraints: constraints,
      onicecandidate: participant.onIceCandidate.bind(participant),
      configuration: {
        iceServers: [
          {
            urls: 'turn:34.64.222.23:3478?transport=tcp',
            username: 'effi:1718953288',
            credential: 'kHnl+SMnlJuavkPb3QCgruvbI0k=',
          },
        ],
      },
    };
    participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
      if (error) {
        return console.error(error);
      }
      this.generateOffer(participant.offerToReceiveVideo.bind(participant));
    });

    // console.log(msg);
    msg.userIdList.forEach((item) => {
      receiveVideo(item);
    });
  }

  function leaveRoom() {
    sendMessage({
      id: 'disconnect',
      userId: userId,
    });
    navigate('/group-home');

    window.location.reload();
  }

  function receiveVideo(sender) {
    const participant = new Participant(sender, sendMessage); // 발신자(비디오를 보낼 참가자)에 대한 새로운 인스턴스 생성

    setParticipants((prevParticipants) => ({
      ...prevParticipants,
      [sender]: participant,
    }));
    const video = participant.getVideoElement(); // 참가자와 연결된 비디오 요소를 검색
    console.log(participant.getVideoElement());

    const options = {
      remoteVideo: video, // 수신된 비디오 스트림이 video 요소에서 렌더링되도록 설정
      onicecandidate: participant.onIceCandidate.bind(participant),
      configuration: {
        iceServers: [
          {
            urls: 'turn:34.64.222.23:3478?transport=tcp',
            username: 'effi:1718953288',
            credential: 'kHnl+SMnlJuavkPb3QCgruvbI0k=',
          },
        ],
      }, // 참가자가 생성한 ICE 후보를 처리하기 위한 콜백 함수를 지정
    };

    participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
      // 비디오 수신 전용(WebRtcPeerRecvonly)을 위해 WebRTC 피어 초기화
      if (error) {
        return console.error(error);
      }

      console.log(participant);
      console.log(participants);
      // 피어에서 generateOffer를 호출하여 SDP 제안 프로세스를 시작
      this.generateOffer(participant.offerToReceiveVideo.bind(participant));
    });
  }

  function onParticipantLeft(request) {
    console.log('Participant ' + request.userId + ' left');
    const participant = participants[request.userId];
    participant.dispose();
    setParticipants((prevParticipants) => {
      const updatedParticipants = { ...prevParticipants };
      delete updatedParticipants[request.userId];
      return updatedParticipants;
    });
  }

  function sendMessage(message) {
    const jsonMessage = JSON.stringify(message);
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(jsonMessage);
    }
  }

  return (
    <>
      <h1>{cameraCount}</h1>
      <S.RoomCameraContainer>
        <S.RoomCameraBox>
          <div ref={participantElementsRef} className="participants">
            {/* <div className="participant" id="6">
              <video id="video-6" autoPlay></video>
              <span>test</span>
            </div>
            <div className="participant" id="7">
              <video id="video-7" autoPlay></video>
              <span>test</span>
            </div>
            <div className="participant" id="7">
              <video id="video-7" autoPlay></video>
              <span>test</span>
            </div>
            <div className="participant" id="7">
              <video id="video-7" autoPlay></video>
              <span>test</span>
            </div>
            <div className="participant" id="7">
              <video id="video-7" autoPlay></video>
              <span>test</span>
            </div> */}
          </div>
        </S.RoomCameraBox>
      </S.RoomCameraContainer>
      <S.RoomButtonContainer className="room-button-container">
        {/* {ROOM_BUTTONS.map((btn, idx) => (
          <RoomButton key={idx} type={btn.type} initialImg={btn.initialImg} changedImg={btn.changedImg} />
        ))} */}
        <button id="leaveBtn" onClick={leaveRoom}>
          나가기
        </button>
      </S.RoomButtonContainer>
    </>
  );
};

export default KurentoCameras;

const S = {
  RoomCameraContainer: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 20px;
  `,
  RoomCameraBox: styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    gap: 10px;
  `,
  RoomButtonContainer: styled.div`
    border: 1px solid white;

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
};
