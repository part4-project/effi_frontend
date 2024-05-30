import { GROUP_MEMBER } from '@constants/mockdata';
import styled from 'styled-components';
import GroupMemberInfo from './group-member-info';

const GroupMemberList = () => {
  return (
    <S.MemberListWrap>
      <S.MemberListTitle>현재 맴버</S.MemberListTitle>
      <S.MemberListBox>
        {GROUP_MEMBER.member_list.map((member) => {
          return <GroupMemberInfo key={member.id} {...member} />;
        })}
      </S.MemberListBox>
    </S.MemberListWrap>
  );
};

export default GroupMemberList;

const S = {
  MemberListWrap: styled.div`
    width: 100%;
  `,
  MemberListTitle: styled.p``,
  MemberListBox: styled.div`
    padding: 24px;
    background-color: #c2c2c2;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  `,
};
