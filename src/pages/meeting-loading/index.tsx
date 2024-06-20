import { useEffect } from 'react';
import { TGroupMemberFetchRes } from '@api/group/group-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useGroupStore } from '@stores/group';
import { useMeetingStore } from '@stores/meeting';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

const MeetingLoading = () => {
  const theme = useTheme();
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

  return (
    <S.MeetingLoadingContainer>
      <img src={theme.effiPhone} alt="effi_phone_icon" />
      <h1>회의실 입장 중입니다.</h1>
    </S.MeetingLoadingContainer>
  );
};

export default MeetingLoading;

const S = {
  MeetingLoadingContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 100vh;
    background-color: ${(props) => props.theme.theme02};

    img {
      max-width: 64px;
      width: 100%;
      height: auto;
    }

    h1 {
      color: ${(props) => props.theme.button03};
      font-size: 28px;
    }
  `,
};
