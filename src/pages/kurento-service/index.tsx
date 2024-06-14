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
      console.log(new Date());
      console.log('STOMP 연결됨');
      stompClient.subscribe('/sub', handleReceivedMessage); // 구독할 주제 설정
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
    console.log('send!');
    if (stompClientRef.current.connected) {
      stompClientRef.current.publish({
        destination: '/app/sendMessage', // 서버에서 메시지 수신 엔드포인트
        body: '테스트메세지!', // 전송할 메시지
      });
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
