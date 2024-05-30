import arrowRight from '@assets/icons/arrow-left.svg';
import GroupModal from '@components/modal/group-modal';
import MeetingModal from '@components/modal/meeting-modal';
import { navBarHeight } from '@styles/subsection-size';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MeetingNotes from './components/meeting-notes';
import Meetings from './components/meetings';

const GroupHome = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate('/');
  };

  return (
    <S.Container>
      <S.GroupHomeHeader>
        <S.BackButton onClick={handleBackButtonClick} />
        <S.ManageButtons>
          <GroupModal>
            <div>그룹 관리</div>
          </GroupModal>
          <MeetingModal>
            <div>회의 생성</div>
          </MeetingModal>
        </S.ManageButtons>
      </S.GroupHomeHeader>

      <Meetings />
      <MeetingNotes />
    </S.Container>
  );
};

export default GroupHome;

const S = {
  Container: styled.div`
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
  `,

  GroupHomeHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  BackButton: styled.img.attrs({
    src: arrowRight,
  })`
    width: 15px;
    cursor: pointer;
  `,

  ManageButtons: styled.div`
    display: flex;
    gap: 20px;
  `,
};
