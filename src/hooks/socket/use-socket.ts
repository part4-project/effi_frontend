import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const useSocket = () => {
  const stompClientRef = useRef<Client>();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const sock = new SockJS('https://api.effi.club/signal/connect'); // WebSocket 엔드포인트
    const stompClient = new Client({ webSocketFactory: () => sock });

    stompClientRef.current = stompClient;

    stompClient.onConnect = () => {
      console.log('STOMP 연결됨');
      setIsConnected(true);
    };

    stompClient.onDisconnect = () => {
      console.log('STOMP 연결 끊어짐');
      setIsConnected(false);
    };

    stompClient.activate();

    return () => {
      if (stompClient.connected) {
        console.log('자동해제');
        stompClient.deactivate();
      }
    };
  }, []);

  return { stompClientRef, isConnected };
};

export default useSocket;
