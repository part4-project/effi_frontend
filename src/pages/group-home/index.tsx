import { device } from '@styles/breakpoints';
import { navBarHeight } from '@styles/subsection-size';
import styled from 'styled-components';
import GroupHomeHeader from './components/group-home-header';
import GroupHomeSideBar from './components/group-home-sidebar';
import MeetingNotes from './components/meeting-notes';
import Meetings from './components/meetings';

const GroupHome = () => {
  return (
    <S.Container>
      <GroupHomeSideBar />
      <S.GroupHomeMain>
        <GroupHomeHeader />
        <Meetings />
        <MeetingNotes />
      </S.GroupHomeMain>
    </S.Container>
  );
};

export default GroupHome;

const S = {
  Container: styled.div`
    display: flex;
  `,

  SideBar: styled.div`
    background-color: rgba(0, 0, 0, 0.1);
    width: 270px;
  `,

  GroupHomeMain: styled.div`
    width: 100%;
    height: calc(100vh - ${navBarHeight.desktop});
    padding: 30px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    button {
      background-color: rgba(0, 0, 0, 0.1);
      padding: 10px 15px;
      border-radius: 6px;
      transition: background-color 0.2s ease;
      &:hover {
        background-color: rgba(0, 0, 0, 0.14);
      }
    }
    @media ${device.tablet} {
      height: calc(100vh - ${navBarHeight.tablet});
    }
    @media ${device.mobile} {
      height: calc(100vh - ${navBarHeight.mobile});
    }
  `,
};
