import { MY_SCHEDULE_LIST } from '@constants/mockdata';
import { device } from '@styles/breakpoints';
import { navBarHeight } from '@styles/subsection-size';
import styled from 'styled-components';
import GroupHomeHeader from './components/group-home-header';
import GroupHomeSideBar from './components/group-home-sidebar';
import MeetingNotes from './components/meeting-notes';
import Meetings from './components/meetings';

const GroupHome = () => {
  const scheduledMeeting = MY_SCHEDULE_LIST[0];
  return (
    <S.Container>
      <GroupHomeSideBar />
      <S.GroupHomeMain>
        <GroupHomeHeader />
        <Meetings scheduledMeeting={scheduledMeeting} />
        <MeetingNotes />
      </S.GroupHomeMain>
    </S.Container>
  );
};

export default GroupHome;

const S = {
  Container: styled.div`
    display: flex;
    background-color: #d2ede8;
  `,

  GroupHomeMain: styled.div`
    width: 100%;
    height: calc(100vh - ${navBarHeight.desktop});
    padding: 112px 82px 86px;
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
