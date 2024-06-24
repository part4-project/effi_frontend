/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { useEffect } from 'react';
import { TAlarm } from '@api/alarm/alarm-request.type';
import { TUserInfoRes } from '@api/user/user-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useToast } from '@hooks/use-toast';
import { IMessage } from '@stomp/stompjs';
import { useQueryClient } from '@tanstack/react-query';
import useSocket from './use-socket';

const useAlarmSocket = () => {
  const { stompClientRef: alarmSocketClient, isConnected } = useSocket();
  const userInfo = useQueryClient().getQueryData<TUserInfoRes>([QUERY_KEY.userInfo]);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleReceivedMessage = (message: IMessage) => {
    const msg = JSON.parse(message.body);
    toast(msg.message);
    console.log('서버로부터 메시지 수신:', msg);
    queryClient.setQueryData<TAlarm[]>([QUERY_KEY.alarmList], (prev) => {
      if (prev) {
        return [...prev, msg];
      }
      return [msg];
    });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.alarmList] });
  };

  useEffect(() => {
    if (isConnected && alarmSocketClient.current) {
      const client = alarmSocketClient.current;
      const subscription = client.subscribe(`/signal/sub/alarm/${userInfo?.id}`, handleReceivedMessage); // 구독할 주제 설정

      return () => {
        if (subscription) subscription.unsubscribe();
      };
    }
  }, [isConnected, alarmSocketClient, userInfo]);
};

export default useAlarmSocket;
