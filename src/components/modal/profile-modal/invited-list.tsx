import inviteAcceptIcon from '@assets/icons/invite-check.svg';
import inviteRejectIcon from '@assets/icons/invite-reject.svg';
import { USER } from '@constants/mockdata';
import styled from 'styled-components';

const InvitedList = () => {
  return (
    <S.Container>
      <S.InvitedListLabel>초대받은 그룹</S.InvitedListLabel>
      <S.InvitedList>
        {USER.invited_group.map((group) => (
          <S.InvitedGroup key={group.id}>
            <S.Inviter>{`${group.leader}님이\n초대를 보냈습니다.`}</S.Inviter>
            <S.GroupInfo>
              <S.GroupName>{group.room_name}</S.GroupName>
              <S.GroupCode>#{group.code}</S.GroupCode>
            </S.GroupInfo>

            <S.InvitedGroupButtons>
              <img src={inviteAcceptIcon} />
              <img src={inviteRejectIcon} />
            </S.InvitedGroupButtons>
          </S.InvitedGroup>
        ))}
      </S.InvitedList>
    </S.Container>
  );
};

export default InvitedList;

const S = {
  Container: styled.div`
    margin-top: 48px;
    width: 100%;
  `,

  InvitedListLabel: styled.p`
    font-size: 16px;
    font-weight: bold;
    color: var(--blue05);
    margin-bottom: 12px;
  `,

  InvitedList: styled.ul`
    display: flex;
    gap: 12px;
    width: 505px;
    overflow: auto;
    white-space: nowrap;
    padding-bottom: 11px;
    &::-webkit-scrollbar {
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #d6d6d7;
      border-radius: 50px;
    }
    &::-webkit-scrollbar-track {
      border-radius: 50px;
    }
  `,

  InvitedGroup: styled.li`
    border: 2px solid var(--blue02);
    padding: 10px;
    border-radius: 10px;
  `,

  Inviter: styled.p`
    white-space: pre-line;
    font-size: 12px;
    color: var(--blue04);
    margin-bottom: 10px;
  `,

  GroupInfo: styled.div`
    border: 1px solid var(--blue02);
    border-radius: 5px;
    min-width: 110px;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 14px;
  `,

  GroupName: styled.span`
    color: #3e82f1;
    font-size: 16px;
    margin-right: 5px;
  `,

  GroupCode: styled.span`
    color: #a6a6a6;
    font-size: 12px;
  `,

  InvitedGroupButtons: styled.div`
    display: flex;
    justify-content: end;
    padding-right: 8px;
    gap: 23px;
    img {
      width: 30px;
    }
  `,
};
