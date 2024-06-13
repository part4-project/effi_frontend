import groupLeaderBadge from '@assets/icons/group-leader-badge.svg';
import { GROUP_MEMBER } from '@constants/mockdata';
import GroupNameInput from '@pages/group-home/components/sidebar/group-name-input';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface TGroupHomeSideBarProps {
  isAdmin: boolean;
}

const GroupHomeSideBar = ({ isAdmin }: TGroupHomeSideBarProps) => {
  const navigate = useNavigate();

  const handleLeaveGroupButtonClick = () => {
    navigate('/');
  };

  return (
    <S.Container>
      <GroupNameInput isAdmin={isAdmin} />

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
    background-color: ${(props) => props.theme.theme06};
    border-left: 4px solid ${(props) => props.theme.theme03};
    width: 180px;
    padding: 33px 28px;
    position: relative;
    border-radius: 0 20px 20px 0;
    color: ${(props) => props.theme.text05};
  `,

  GroupMemberLists: styled.ul`
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    gap: 13px;
  `,

  GroupMemberList: styled.li`
    display: flex;
    align-items: center;
    gap: 6px;
  `,

  AdminIcon: styled.img`
    width: 14px;
  `,

  LeaveGroupButton: styled.button`
    background-color: ${(props) => props.theme.button01};
    color: ${(props) => props.theme.theme01};
    font-size: 12px;
    font-weight: bold;
    width: 125px;
    height: 31px;
    border-radius: 50px;
    position: absolute;
    bottom: 40px;
    left: calc(50% - 125px / 2);
  `,
};
