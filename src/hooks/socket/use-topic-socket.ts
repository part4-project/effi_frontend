/* eslint-disable no-unused-vars */
import { useCallback, useEffect } from 'react';
import useSocket from './use-socket';

const useTopicSocket = (meetingId: number, onRefetch: () => void) => {
  const { stompClientRef: chatSocketClient, isConnected } = useSocket();

  const handleReceivedMessage = useCallback(() => {
    onRefetch();
  }, [onRefetch]);
  useEffect(() => {
    if (isConnected && chatSocketClient.current) {
      const client = chatSocketClient.current;
      const subscription = client.subscribe(`/signal/sub/topic/${meetingId}`, handleReceivedMessage); // 구독할 주제 설정

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConnected, chatSocketClient, meetingId, handleReceivedMessage]);

  return;
};

export default useTopicSocket;
