import { GROUP_MEMBER } from '@constants/mockdata';
import styled from 'styled-components';
import circleBlue5 from '@/assets/icons/circle-blue5.svg';
import circleGray from '@/assets/icons/circle-gray.svg';

const ReportMember = () => {
  return (
    <S.Container>
      <S.Participant>회의 참여자</S.Participant>
      <S.MemberLists>
        {GROUP_MEMBER.member_list.map((member) => (
          <S.MemberList key={member.id}>
            {member.is_admin ? <S.MemberIcon src={circleBlue5} /> : <S.MemberIcon src={circleGray} />}
            <S.MemberName>{member.name}</S.MemberName>
          </S.MemberList>
        ))}
      </S.MemberLists>
    </S.Container>
  );
};

export default ReportMember;

const S = {
  Container: styled.div`
    grid-area: member;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 2px solid #f3f3f3;
    height: 180px;
    padding: 15px 10px 10px 15px;
  `,

  Participant: styled.p`
    background: var(--white);
    color: #9d9d9d;
    font-size: 20px;
    font-weight: 900;
    line-height: 35px;
    border-bottom: 1px solid #f3f3f3;
    padding-bottom: 10px;
  `,

  MemberLists: styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 130px);
    padding: 10px;
    width: 100%;
    overflow-y: auto;
  `,

  MemberList: styled.li`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 8px;
    padding: 4px;
    color: #9d9d9d;
    font-weight: 700;
  `,

  MemberIcon: styled.img`
    width: 20px;
    height: 20px;
  `,

  MemberName: styled.span`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
};
