import { TGroupFetchMemberInfo } from '@api/group/group-request.type';
import { TReportParticipant } from '@api/report/report-request.type';
import { useGroupMemberQuery } from '@hooks/react-query/use-query-group';
import { useGroupStore } from '@stores/group';
import styled from 'styled-components';

interface TReportMember {
  participantList: TReportParticipant[];
}
const ReportMember = ({ participantList }: TReportMember) => {
  const {
    data: { memberList },
  } = useGroupMemberQuery(useGroupStore((state) => state.groupId));
  const memberDataList = participantList.map((participant: TReportParticipant) => {
    return memberList.find((member: TGroupFetchMemberInfo) => participant.userId == member.id);
  });

  return (
    <S.Container>
      <S.Participant>회의 참여자</S.Participant>
      <S.MemberLists>
        {memberDataList.map((member: TGroupFetchMemberInfo) => (
          <S.MemberList key={member.id}>
            <S.MemberIcon src={member.profileImageUrl} $isAdmin={member.admin} />
            <S.MemberName>{member.nickname}</S.MemberName>
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
    border: 2px solid ${(props) => props.theme.box};
    height: 180px;
    padding: 15px 10px 10px 15px;
    background: ${(props) => props.theme.theme10};
  `,

  Participant: styled.p`
    background: ${(props) => props.theme.theme10};
    color: ${(props) => props.theme.text11};
    font-size: 20px;
    font-weight: 900;
    line-height: 35px;
    border-bottom: 1px solid ${(props) => props.theme.box};
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
    color: ${(props) => props.theme.text11};
    font-weight: 700;
  `,

  MemberIcon: styled.img<{ $isAdmin: boolean }>`
    width: 20px;
    height: 20px;
    border-radius: 20px;
    border: 1px solid ${({ $isAdmin, theme }) => $isAdmin && theme.theme05};
  `,

  MemberName: styled.span`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
};
