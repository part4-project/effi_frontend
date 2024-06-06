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
  MemberListTitle: styled.p`
    color: #404040;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 6px;
  `,
  MemberListBox: styled.div`
    display: flex;
    flex-direction: column;
    padding-right: 14px;
    overflow-y: auto;
    max-height: 17vh;
  `,
};
