import { useEffect, useState } from 'react';
import { TGroupFetchMemberInfo } from '@api/group/group-request.type';
import { TUserInfoRes } from '@api/user/user-request.type';
import { MY_SCHEDULE_LIST } from '@constants/mockdata';
import { QUERY_KEY } from '@constants/query-key';
import { useGroupMemberQuery } from '@hooks/react-query/use-query-group';
import GroupHomeHeader from '@pages/group-home/components/group-home-header';
import MeetingNotes from '@pages/group-home/components/meeting-notes';
import Meetings from '@pages/group-home/components/meetings';
import GroupHomeSideBar from '@pages/group-home/components/sidebar/group-home-sidebar';
import { useGroupStore } from '@stores/group';
import { device } from '@styles/breakpoints';
import { navBarHeight } from '@styles/subsection-size';
import { zIndex } from '@styles/z-index';
import { useQueryClient } from '@tanstack/react-query';
import styled, { useTheme } from 'styled-components';
import AdminHOC from './components/admin-hoc';
import GroupHomeSidebarSkeleton from './components/skeleton/group-home-sidebar-skeleton';

const GroupHome = () => {
  const theme = useTheme();
  const { data: groupData, isError, isLoading } = useGroupMemberQuery(useGroupStore((state) => state.groupId));
  const userInfo = useQueryClient().getQueryData<TUserInfoRes>([QUERY_KEY.userInfo]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const scheduledMeeting = MY_SCHEDULE_LIST[0];
  const isFromMeeting = localStorage.getItem('isFromMeeting');

  const handleSideBarButtonClick = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isLoading) {
      const { id: adminId } = groupData.memberList.find((data: TGroupFetchMemberInfo) => data.admin);
      setIsAdmin(adminId === userInfo?.id);
    }
  }, [isLoading, userInfo, groupData]);

  useEffect(() => {
    if (isFromMeeting === 'true') {
      window.location.reload();
      localStorage.removeItem('isFromMeeting');
    }
  }, [isFromMeeting]);

  if (isError) return 'Error...';

  return (
    <S.Container>
      {isLoading ? <GroupHomeSidebarSkeleton /> : <GroupHomeSideBar isAdmin={isAdmin} isSideBarOpen={isSideBarOpen} />}
      <button onClick={handleSideBarButtonClick}>
        <S.SideBarControlImage
          src={!isSideBarOpen ? theme.sideBarOpen : theme.sideBarClose}
          alt="GroupHome SideBar Button"
        />
      </button>

      <S.GroupHomeMain>
        {isAdmin && <GroupHomeHeader />}
        <Meetings isAdmin={isAdmin} scheduledMeeting={scheduledMeeting} />
        <MeetingNotes />
      </S.GroupHomeMain>
    </S.Container>
  );
};

export default AdminHOC(GroupHome);

const S = {
  Container: styled.div`
    display: flex;
    background-color: ${(props) => props.theme.theme02};
  `,

  SideBarControlImage: styled.img`
    position: fixed;
    top: 66px;
    left: 28px;
    width: 28px;
    height: 28px;
    display: none;
    position: fixed;

    z-index: ${zIndex.groupHomeSideBarButton};
    @media ${device.mobile} {
      display: block;
    }
  `,

  GroupHomeMain: styled.div`
    width: 100%;
    height: calc(100vh - ${navBarHeight.desktop});
    padding: 80px 80px 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;

    @media ${device.tablet} {
      height: calc(100vh - ${navBarHeight.tablet});
    }
    @media ${device.mobile} {
      height: calc(100vh - ${navBarHeight.mobile});
      padding: 80px 40px 20px;
    }
  `,
};
