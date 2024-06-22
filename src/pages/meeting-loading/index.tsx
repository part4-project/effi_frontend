import { useEffect } from 'react';
import { TGroupMemberFetchRes } from '@api/group/group-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useGroupStore } from '@stores/group';
import { useMeetingStore } from '@stores/meeting';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

const MeetingLoading = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const groupInfo = useQueryClient().getQueryData<TGroupMemberFetchRes>([
    QUERY_KEY.groupInfo,
    useGroupStore((state) => state.groupId),
  ]);
  const { roomId } = location.state || {};

  const removeMemberList = useMeetingStore((state) => state.removeMemberList);
  const setMemberList = useMeetingStore((state) => state.setMemberList);

  useEffect(() => {
    if (groupInfo) {
      removeMemberList();
      setMemberList(groupInfo.memberList.map((member) => member));
      navigate('/meeting-room', { state: { roomId: roomId } });
    } else {
      navigate('/group-home');
    }
  });

  return <div>회의실 진입 중~</div>;
};

export default MeetingLoading;
