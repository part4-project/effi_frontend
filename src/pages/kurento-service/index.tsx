import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const KurentoService = () => {
  const stompClientRef = useRef(null);

  useEffect(() => {
    const sock = new SockJS('https://api.effi.club/signal/connect'); // WebSocket 엔드포인트
    const stompClient = new Client({ webSocketFactory: () => sock });

    stompClientRef.current = stompClient;

    stompClient.onConnect = () => {
      // console.log(new Date());
      console.log('STOMP 연결됨');
      // 엔드포인트 추후 /signal/sub/meeting/1/chat 으로 바뀔예정 (반영아직안됨);
      stompClient.subscribe('/signal/sub/1/chat', handleReceivedMessage); // 구독할 주제 설정
    };

    stompClient.onDisconnect = () => {
      console.log('STOMP 연결 끊어짐');
    };

    stompClient.activate();

    return () => {
      if (stompClient.connected) {
        console.log('자동해제');
        stompClient.deactivate();
      }
    };
  }, []);

  const handleReceivedMessage = (message) => {
    console.log('서버로부터 메시지 수신:', message.body);
    // 원하는 동작 수행
  };

  const sendMessageToServer = () => {
    const messageObject = {
      type: 'ENTER', // SessionMessageType에 따라 적절한 값을 설정
      userId: 30, // 실제 사용자 ID 값
      meetingId: 1, // 회의 ID 값
      message: ' ID : 30번 유저가 1번 회의실에 입장하였습니다!!', // 원하는 메시지
      timeStamp: new Date().toISOString(), // 현재 시각 ISO 문자열 형식으로
    };

    if (stompClientRef.current.connected) {
      stompClientRef.current.publish({
        destination: '/signal/pub/meeting/1/enter',
        body: JSON.stringify(messageObject),
      });
      // console.log('Message sent to server:', messageObject);
    } else {
      console.error('WebSocket 연결이 필요합니다.');
    }
  };

  return (
    <div>
      <h1>WebSocket Example</h1>
      <button onClick={sendMessageToServer}>서버로 메시지 전송</button>
    </div>
  );
};

export default KurentoService;
