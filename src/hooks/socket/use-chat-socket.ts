/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react';
import { SOCKET_TYPE } from '@constants/socket-type';
import { TChatSocketType } from '@pages/meeting-room/types';
import { IMessage } from '@stomp/stompjs';
import useSocket from './use-socket';

const useChatSocket = (meetingId: number) => {
  const { stompClientRef: chatSocketClient, isConnected } = useSocket();
  const [chatSocketList, setChatSocketList] = useState<TChatSocketType[]>([]);

  const sendMessage = useCallback(
    (type: string, message: string) => {
      const messageObject = {
        type: type, // SessionMessageType에 따라 적절한 값을 설정
        userId: 30, // 실제 사용자 ID 값
        meetingId: meetingId, // 회의 ID 값
        message: message, // 원하는 메시지
        timeStamp: new Date().toISOString(), // 현재 시각 ISO 문자열 형식으로
      };

      if (chatSocketClient?.current?.connected) {
        chatSocketClient.current.publish({
          destination: `/signal/pub/meeting/${meetingId}/${type.toLowerCase()}`,
          body: JSON.stringify(messageObject),
        });
        console.log('Message sent to server:', messageObject);
      } else {
        console.error('WebSocket 연결이 필요합니다.');
      }
    },
    [chatSocketClient, meetingId],
  );
  const handleReceivedMessage = (message: IMessage) => {
    const msg = JSON.parse(message.body);
    console.log('서버로부터 메시지 수신:', msg);
    setChatSocketList((prevData) => [...prevData, msg]);
  };
  useEffect(() => {
    if (isConnected && chatSocketClient.current) {
      const client = chatSocketClient.current;
      const subscription = client.subscribe(`/signal/sub/meeting/${meetingId}/chat`, handleReceivedMessage); // 구독할 주제 설정

      sendMessage(SOCKET_TYPE.ENTER, '입장');

      return () => {
        subscription.unsubscribe();
        sendMessage(SOCKET_TYPE.LEAVE, '퇴장');
      };
    }
  }, [isConnected, chatSocketClient, meetingId, sendMessage]);

  return { sendMessage, chatSocketList };
};

export default useChatSocket;
