/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { TUserInfoRes } from '@api/user/user-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useToast } from '@hooks/use-toast';
import { IMessage } from '@stomp/stompjs';
import { useQueryClient } from '@tanstack/react-query';
import useSocket from './use-socket';

type TAlarm = {
  id: string;
  message: string;
  receiverId: number;
  title: string;
};

const useAlarmSocket = () => {
  const { stompClientRef: alarmSocketClient, isConnected } = useSocket();
  const [alarmSocketList, setAlarmSocketList] = useState<TAlarm[]>([]);
  const userInfo = useQueryClient().getQueryData<TUserInfoRes>([QUERY_KEY.userInfo]);
  const { toast } = useToast();

  const handleReceivedMessage = (message: IMessage) => {
    const msg = JSON.parse(message.body);
    toast(msg.message);
    console.log('서버로부터 메시지 수신:', msg);
    setAlarmSocketList((prevData) => [...prevData, msg]);
  };

  useEffect(() => {
    if (isConnected && alarmSocketClient.current) {
      const client = alarmSocketClient.current;
      const subscription = client.subscribe(`/signal/sub/alarm/${userInfo?.id}`, handleReceivedMessage); // 구독할 주제 설정

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isConnected, alarmSocketClient, userInfo]);

  return { alarmSocketList };
};

export default useAlarmSocket;
