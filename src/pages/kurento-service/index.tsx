// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useRef } from 'react';
import './kurento-service.style.css';

import Participant from '@pages/kurento-service/utils/kurento-service';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { TUserInfoRes } from '@api/user/user-request.type';
import { QUERY_KEY } from '@constants/query-key';

const KurentoService = () => {
  const navigate = useNavigate();
  const userInfo = useQueryClient().getQueryData<TUserInfoRes>([QUERY_KEY.userInfo]);
  console.log(userInfo.id);
  let userId = userInfo.id;
  let roomId = 121222123987;
  const ws = useRef(null);
  const participants = {};

  useEffect(() => {
    ws.current = new WebSocket('https://api.effi.club/signal/webrtc');
    ws.current.onopen = function () {
      console.log('WebSocket connection opened.');
      const message = {
        id: 'connect',
        userId: userId,
        roomId: roomId,
      };
      sendMessage(message);
    };
    ws.current.onclose = function () {
      console.log('WebSocket connection closed.');
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
          participants[parsedMessage.userId].rtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
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
        console.log('닫히기 전');
        ws.current.close();
        console.log('닫힘!!!!');
      }
    };
  }, []);

  // const register = () => {
  //   document.getElementById('container').style.visibility = 'hidden';
  //   document.getElementById('leaveBtn').style.visibility = 'visible';
  // };

  const onNewParticipant = (request) => {
    console.log(888888888888);
    console.log(request);

    receiveVideo(parseInt(request.userId));
  };

  const receiveVideoResponse = (result) => {
    console.log(result);
    // participants 에서 참가자(result.name)와 연결된 rtcPeer 개체를 검색
    participants[result.sender].rtcPeer.processAnswer(
      result.sdpAnswer, // 원격 참가자로부터 받은 SDP 응답
      function (error) {
        if (error) return console.error(error);
      },
    );
  };

  function onExistingParticipants(msg) {
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          maxWidth: 320,
          maxFrameRate: 15,
          minFrameRate: 15,
        },
      },
    };
    console.log(userId + ' 가 다음 방에 입장: ' + roomId);
    const participant = new Participant(userId, sendMessage);

    participants[userId] = participant;

    console.log(participants[userId] + '★');

    const video = participant.getVideoElement();

    console.log(participant.video);

    const options = {
      localVideo: video,
      mediaConstraints: constraints,
      onicecandidate: participant.onIceCandidate.bind(participant),
      configuration: {
        iceServers: [
          {
            urls: 'turn:34.64.222.23:3478?transport=tcp',
            username: 'effi:1718876032',
            credential: 'kh/O0LAxYIoSd2GpriYNfCcOK9I=',
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

    console.log(msg);
    msg.userIdList.forEach((item) => {
      receiveVideo(item);
    });
  }

  function leaveRoom() {
    // document.getElementById('container').style.visibility = 'visible';
    // document.getElementById('leaveBtn').style.visibility = 'hidden';

    sendMessage({
      id: 'disconnect',
      userId: userId,
    });
    navigate('/group-home');
  }

  function receiveVideo(sender) {
    const participant = new Participant(sender, sendMessage); // 발신자(비디오를 보낼 참가자)에 대한 새로운 인스턴스 생성

    participants[sender] = participant; // 발신자 이름을 키로 사용하여 참가자 개체를 participants 객체에 저장
    const video = participant.getVideoElement(); // 참가자와 연결된 비디오 요소를 검색
    console.log(participant.getVideoElement());

    const options = {
      remoteVideo: video, // 수신된 비디오 스트림이 video 요소에서 렌더링되도록 설정
      onicecandidate: participant.onIceCandidate.bind(participant),
      configuration: {
        iceServers: [
          {
            urls: 'turn:34.64.222.23:3478?transport=tcp',
            username: 'effi:1718876032',
            credential: 'kh/O0LAxYIoSd2GpriYNfCcOK9I=',
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
    delete participants[request.userId];
  }

  function sendMessage(message) {
    const jsonMessage = JSON.stringify(message);
    // console.log('Sending message: ' + jsonMessage);
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(jsonMessage);
    }
  }

  return (
    <div>
      <button id="leaveBtn" onClick={leaveRoom}>
        🙌나가기🙌
      </button>

      <div id="participants">
        {Object.values(participants).map((participant) => (
          <div key={participant.userId}>
            {participant.getVideoElement()}
            <span>{participant.userId}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KurentoService;
