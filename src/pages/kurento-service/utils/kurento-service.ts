import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WebSocketService = (() => {
  let client = null;

  const connect = (onMessageReceived) => {
    client = new Client({
      webSocketFactory: () => {
        return new SockJS('https://api.effi.club/signal/connect');
      },
      onConnect: () => {
        console.log('WebSocket 연결');
        client.subscribe('/signal/sub/meeting/{roomId}/chat', (message) => {
          onMessageReceived(JSON.parse(message.body));
        });
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
      console.log('STOMP 연결 끊어짐');
      client.deactivate();
    }
  };

  const sendMessage = (destination, body) => {
    if (client !== null && client.connected) {
      console.log('서버로부터 메시지 수신:', body);
      client.publish({ destination, body: JSON.stringify(body) });
    }
  };

  return {
    connect,
    disconnect,
    sendMessage,
  };
})();

export default WebSocketService;
