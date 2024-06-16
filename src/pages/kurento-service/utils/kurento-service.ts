/* eslint-disable no-console */
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WebSocketService = (() => {
  let client: Client | null = null;

  const connect = () => {
    client = new Client({
      webSocketFactory: () => {
        return new SockJS('https://api.effi.club/signal/connect');
      },
      onConnect: () => {
        console.log('WebSocket 연결됨');
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    client.activate();
  };

  const disconnect = () => {
    if (client !== null) {
      console.log('WebSocket 연결 끊어짐');
      client.deactivate();
    }
  };

  return {
    connect,
    disconnect,
  };
})();

export default WebSocketService;
