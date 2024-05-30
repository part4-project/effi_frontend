import { GROUP, GROUP_MEMBER } from '@constants/mockdata';
import styled from 'styled-components';

const GroupHomeSideBar = () => {
  return (
    <S.Container>
      <S.GroupName>{GROUP.room_name}</S.GroupName>
      <S.GroupCode>#{GROUP.code}</S.GroupCode>

      <S.GroupMemberLists>
        {GROUP_MEMBER.member_list.map((member) => (
          <S.GroupMemberList>
            <span>{member.name}</span>
            {member.is_admin && <S.AdminIcon>그룹장</S.AdminIcon>}
          </S.GroupMemberList>
        ))}
      </S.GroupMemberLists>
    </S.Container>
  );
};

export default GroupHomeSideBar;

const S = {
  Container: styled.div`
    background-color: rgba(0, 0, 0, 0.1);
    width: 260px;
    padding: 20px 10px;
  `,

  GroupName: styled.span`
    font-size: 20px;
    margin-right: 5px;
  `,

  GroupCode: styled.span`
    color: rgba(0, 0, 0, 0.3);
  `,

  GroupMemberLists: styled.ul`
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    margin-top: 20px;
    padding-top: 20px;
  `,

  GroupMemberList: styled.li`
    padding: 10px;
  `,

  AdminIcon: styled.span`
    padding-left: 10px;
    font-size: 13px;
    color: orange;
  `,
};
