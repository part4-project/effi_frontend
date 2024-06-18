import { TGroupFetchMemberInfo } from '@api/group/group-request.type';
import { TChatSocketType } from '@pages/meeting-room/types';
import { useMeetingStore } from '@stores/meeting';

const useTransformUser = (socketMsg: TChatSocketType) => {
  const memberList = useMeetingStore((state) => state.memberList);
  const member = memberList.find((member: TGroupFetchMemberInfo) => socketMsg.userId == member.id);
  let memberChat;
  if (member) {
    memberChat = {
      ...member,
      message: socketMsg.message,
      timeStamp: socketMsg.timeStamp,
      type: socketMsg.type,
      userId: socketMsg.userId,
    };
  }

  return memberChat;
};

export default useTransformUser;
