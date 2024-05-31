import { GROUP_MEMBER } from '@constants/mockdata';
import styled from 'styled-components';

const ReportMember = () => {
  return (
    <>
      <p>회의 참여자</p>
      <S.MemberLists>
        {GROUP_MEMBER.member_list.map((member) => (
          <S.MemberList key={member.id}>{member.name}</S.MemberList>
        ))}
      </S.MemberLists>
    </>
  );
};

export default ReportMember;

const S = {
  MemberLists: styled.ul`
    display: flex;
    gap: 4px;
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    padding: 10px;
    width: 100%;
  `,

  MemberList: styled.li`
    display: flex;
    gap: 10px;
    flex-direction: column;
    margin-top: 8px;
    padding: 4px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    background-color: #c2c2c2;
  `,
};
