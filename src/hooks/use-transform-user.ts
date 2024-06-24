import { TGroupFetchMemberInfo } from '@api/group/group-request.type';
import { TChatSocketType } from '@pages/meeting-room/types';
import { useGroupStore } from '@stores/group';
import { useGroupMemberQuery } from './react-query/use-query-group';

const useTransformUser = (socketMsg: TChatSocketType) => {
  const {
    data: { memberList },
  } = useGroupMemberQuery(useGroupStore((state) => state.groupId));
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
