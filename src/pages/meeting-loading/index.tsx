import { useEffect } from 'react';
import { TGroupMemberFetchRes } from '@api/group/group-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useGroupStore } from '@stores/group';
import { useMeetingStore } from '@stores/meeting';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const MeetingLoading = () => {
  const navigate = useNavigate();
  const groupInfo = useQueryClient().getQueryData<TGroupMemberFetchRes>([
    QUERY_KEY.groupInfo,
    useGroupStore((state) => state.groupId),
  ]);

  const removeMemberList = useMeetingStore((state) => state.removeMemberList);
  const setMemberList = useMeetingStore((state) => state.setMemberList);

  useEffect(() => {
    if (groupInfo) {
      removeMemberList();
      setMemberList(groupInfo.memberList.map((member) => member));
      navigate('/meeting-room');
    } else {
      navigate('/group-home');
    }
  });

  return <div>회의실 진입 중~</div>;
};

export default MeetingLoading;
