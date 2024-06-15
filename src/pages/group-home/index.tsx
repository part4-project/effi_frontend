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
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import AdminHOC from './components/admin-hoc';

const GroupHome = () => {
  const { data: groupData, isError, isLoading } = useGroupMemberQuery(useGroupStore((state) => state.groupId));
  const userInfo = useQueryClient().getQueryData<TUserInfoRes>([QUERY_KEY.userInfo]);

  if (isLoading) return 'Loading...';
  if (isError) return 'Error...';

  const scheduledMeeting = MY_SCHEDULE_LIST[0];
  const isOnLive = true;
  const { id: adminId } = groupData.memberList.find((data: TGroupFetchMemberInfo) => data.admin);
  const isAdmin = adminId == userInfo?.id;

  return (
    <S.Container>
      <GroupHomeSideBar isAdmin={isAdmin} />
      <S.GroupHomeMain>
        {isAdmin && <GroupHomeHeader />}
        <Meetings isOnLive={isOnLive} isAdmin={isAdmin} scheduledMeeting={scheduledMeeting} />
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
    }
  `,
};
