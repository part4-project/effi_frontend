import { ComponentType } from 'react';
import { TUserInfoRes } from '@api/user/user-request.type';
import { QUERY_KEY } from '@constants/query-key';
import useTransformUser from '@hooks/use-transform-user';
import { TChatSocketType } from '@pages/meeting-room/types';
import { useQueryClient } from '@tanstack/react-query';

interface TUserHOCProp {
  socket: TChatSocketType;
}
interface WithChatProp {
  chat: NonNullable<ReturnType<typeof useTransformUser>>; // `useTransformUser`의 반환 타입에서 `null`을 제외
  isMe: boolean;
}
const UserHOC = <P extends TUserHOCProp>(Component: ComponentType<P & WithChatProp>) => {
  const HOCComponent: React.FC<P> = (props: P) => {
    const chat = useTransformUser(props.socket);
    const userInfo = useQueryClient().getQueryData<TUserInfoRes>([QUERY_KEY.userInfo]);
    const isMe = userInfo?.id == chat?.userId;
    if (!chat) {
      return null;
    } else {
      return <Component {...props} chat={chat} isMe={isMe} />;
    }
  };

  return HOCComponent;
};

export default UserHOC;
