import groupLeaderBadge from '@assets/icons/group-leader-badge.svg';
import { GROUP, GROUP_MEMBER } from '@constants/mockdata';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const GroupHomeSideBar = () => {
  const navigate = useNavigate();
  const handleLeaveGroupButtonClick = () => {
    navigate('/');
  };
  return (
    <S.Container>
      <S.GroupName>{GROUP.room_name}</S.GroupName>
      <S.GroupNameSub>
        <S.GroupCode>#{GROUP.code}</S.GroupCode>
        <S.EditIcon>연필</S.EditIcon>
      </S.GroupNameSub>

      <S.GroupMemberLists>
        {GROUP_MEMBER.member_list.map((member) => (
          <S.GroupMemberList key={member.id}>
            <span>{member.name}</span>
            {member.is_admin && <S.AdminIcon src={groupLeaderBadge} />}
          </S.GroupMemberList>
        ))}
      </S.GroupMemberLists>

      <S.LeaveGroupButton onClick={handleLeaveGroupButtonClick}>그룹 나가기</S.LeaveGroupButton>
    </S.Container>
  );
};

export default GroupHomeSideBar;

const S = {
  Container: styled.div`
    background-color: var(--white);
    border-left: 4px solid var(--blue03);
    width: 180px;
    padding: 33px 28px;
    position: relative;
    border-radius: 0 20px 20px 0;
    color: #404040;
  `,

  GroupName: styled.span`
    font-weight: bold;
    font-size: 20px;
  `,

  GroupNameSub: styled.div`
    margin-top: 5px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
  `,

  GroupCode: styled.span`
    color: rgba(0, 0, 0, 0.3);
  `,

  EditIcon: styled.span``,

  GroupMemberLists: styled.ul`
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    gap: 13px;
  `,

  GroupMemberList: styled.li`
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 6px;
  `,

  AdminIcon: styled.img`
    width: 14px;
  `,

  LeaveGroupButton: styled.button`
    background-color: var(--blue02);
    color: var(--blue01);
    font-size: 12px;
    font-weight: bold;
    width: 125px;
    height: 31px;

    border-radius: 20px;
    position: absolute;
    bottom: 40px;
    left: calc(50% - 125px / 2);
  `,
};
