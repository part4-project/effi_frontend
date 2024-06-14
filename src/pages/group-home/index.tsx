import { MY_SCHEDULE_LIST } from '@constants/mockdata';
import GroupHomeHeader from '@pages/group-home/components/group-home-header';
import MeetingNotes from '@pages/group-home/components/meeting-notes';
import Meetings from '@pages/group-home/components/meetings';
import GroupHomeSideBar from '@pages/group-home/components/sidebar/group-home-sidebar';
import { device } from '@styles/breakpoints';
import { navBarHeight } from '@styles/subsection-size';
import styled from 'styled-components';
import AdminHOC from './components/admin-hoc';

const GroupHome = () => {
  const scheduledMeeting = MY_SCHEDULE_LIST[0];
  const isOnLive = true;
  const isAdmin = true;

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
    background-color: var(--blue02);
  `,

  GroupHomeMain: styled.div`
    width: 100%;
    height: calc(100vh - ${navBarHeight.desktop});
    padding: 80px 80px 60px;
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
