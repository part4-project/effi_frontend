/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useRef } from 'react';
import kurentoUtils from 'kurento-utils';
import './kurento-service.style.css';

const PARTICIPANT_MAIN_CLASS = 'participant main';
const PARTICIPANT_CLASS = 'participant';

class Participant {
  constructor(userId, roomId, sendMessage) {
    this.userId = userId;
    this.roomId = roomId;

    this.container = document.createElement('div');
    this.container.className = this.isPresentMainParticipant() ? PARTICIPANT_CLASS : PARTICIPANT_MAIN_CLASS;
    this.container.id = userId;
    this.span = document.createElement('span');
    this.video = document.createElement('video');
    this.rtcPeer = null;
    this.sendMessage = sendMessage;
    this.onIceCandidate = this.onIceCandidate.bind(this);

    this.container.appendChild(this.video);
    this.container.appendChild(this.span);
    this.container.onclick = this.switchContainerClass.bind(this);
    document.getElementById('participants').appendChild(this.container);

    this.span.appendChild(document.createTextNode(userId));

    this.video.id = 'video-' + userId;
    this.video.autoplay = true;
    this.video.controls = false;
  }

  getElement() {
    return this.container;
  }

  getVideoElement() {
    return this.video;
  }

  switchContainerClass() {
    if (this.container.className === PARTICIPANT_CLASS) {
      const elements = Array.prototype.slice.call(document.getElementsByClassName(PARTICIPANT_MAIN_CLASS));
      elements.forEach(function (item) {
        item.className = PARTICIPANT_CLASS;
      });

      this.container.className = PARTICIPANT_MAIN_CLASS;
    } else {
      this.container.className = PARTICIPANT_CLASS;
    }
  }

  isPresentMainParticipant() {
    return document.getElementsByClassName(PARTICIPANT_MAIN_CLASS).length !== 0;
  }

  offerToReceiveVideo(error, offerSdp) {
    if (error) return console.error('sdp offer error');
    console.log('Invoking SDP offer callback function');
    const msg = {
      id: 'receiveVideoFrom',
      sender: this.userId,
      sdpOffer: offerSdp,
    };
    this.sendMessage(msg);
  }

  onIceCandidate(candidate) {
    console.log('Local candidate' + JSON.stringify(candidate));

    const message = {
      id: 'onIceCandidate',
      candidate: candidate,
      userId: this.userId,
      roomId: this.roomId,
    };
    this.sendMessage(message);
  }

  dispose() {
    console.log('Disposing participant ' + this.name);
    if (this.rtcPeer) {
      this.rtcPeer.dispose();
    }
    this.container.parentNode.removeChild(this.container);
  }
}

const App = () => {
  const ws = useRef(null);
  const participants = {};
  const userIdRef = useRef(null);
  const roomIdRef = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('https://api.effi.club/signal/webrtc');
    ws.current.onopen = function () {
      console.log('WebSocket connection opened.');
    };
    ws.current.onmessage = function (message) {
      const parsedMessage = JSON.parse(message.data);
      console.info('Received message: ' + message.data);

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
          participants[parsedMessage.name].rtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
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
      }
    };
  }, []);

  const register = () => {
    userIdRef.current = document.getElementById('userId').value;
    roomIdRef.current = document.getElementById('roomId').value;
    document.getElementById('container').style.visibility = 'hidden';
    document.getElementById('leaveBtn').style.visibility = 'visible';

    const message = {
      id: 'connect',
      userId: parseInt(userIdRef.current),
      roomId: parseInt(roomIdRef.current),
    };
    sendMessage(message);

    // 테스트
    const msg = {
      data: [{ receiver: 123, roomId: 456 }],
    };

    onExistingParticipants(msg);
  };

  const onNewParticipant = (request) => {
    receiveVideo(request.name);
  };

  const receiveVideoResponse = (result) => {
    // participants 에서 참가자(result.name)와 연결된 rtcPeer 개체를 검색
    participants[result.name].rtcPeer.processAnswer(
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
        width: 640,
        framerate: 15,
      },
    };
    console.log(userIdRef.current + ' 가 다음 방에 입장: ' + roomIdRef.current);
    const participant = new Participant(parseInt(userIdRef.current), parseInt(roomIdRef.current), sendMessage);
    console.log(participant);
    participants[userIdRef.current] = participant;
    const video = participant.getVideoElement();

    const options = {
      localVideo: video,
      mediaConstraints: constraints,
      onicecandidate: participant.onIceCandidate.bind(participant),
    };

    participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(options, function (error) {
      if (error) {
        console.error('Error creating WebRtcPeerSendrecv: ', error);
      } else {
        console.log('WebRtcPeerSendrecv created successfully.');

        this.generateOffer(participant.offerToReceiveVideo.bind(participant));
      }
    });

    msg.data.forEach((item) => receiveVideo(item.receiver, item.roomId));
  }

  function leaveRoom() {
    document.getElementById('container').style.visibility = 'visible';
    document.getElementById('leaveBtn').style.visibility = 'hidden';

    sendMessage({
      id: 'disconnect',
    });

    window.location.reload();
  }

  function receiveVideo(receiver, roomId) {
    console.log(receiver, roomId);
    const participant = new Participant(receiver, roomId, sendMessage); // 발신자(비디오를 보낼 참가자)에 대한 새로운 인스턴스 생성
    console.log(participant);
    participants[receiver] = participant; // 발신자 이름을 키로 사용하여 참가자 개체를 participants 객체에 저장
    const video = participant.getVideoElement(); // 참가자와 연결된 비디오 요소를 검색
    console.log(participant.getVideoElement());

    const options = {
      remoteVideo: video, // 수신된 비디오 스트림이 video 요소에서 렌더링되도록 설정
      onicecandidate: participant.onIceCandidate.bind(participant), // 참가자가 생성한 ICE 후보를 처리하기 위한 콜백 함수를 지정
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
    console.log('Participant ' + request.name + ' left');
    const participant = participants[request.name];
    participant.dispose();
    delete participants[request.name];
  }

  function sendMessage(message) {
    const jsonMessage = JSON.stringify(message);
    console.log('Sending message: ' + jsonMessage);
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(jsonMessage);
    }
  }

  return (
    <div>
      <div id="container">
        <div className="title">😁EFFI😁</div>
        <input type="text" id="userId" placeholder="userId 입력" />
        <input type="text" id="roomId" placeholder="roomId 입력" />
        <button id="registerBtn" onClick={register}>
          🔑Enter🔑
        </button>
      </div>
      <button id="leaveBtn" onClick={leaveRoom}>
        🙌Leave🙌
      </button>

      <div id="participants">
        {Object.values(participants).map((participant) => (
          <div key={participant.userId}>
            {participant.getVideoElement()} {/* 비디오 요소 사용 */}
            <span>{participant.userId}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
