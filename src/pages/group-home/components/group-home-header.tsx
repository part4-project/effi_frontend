import createMeetingButton from '@assets/icons/plus-monitor.svg';
import groupManageButton from '@assets/icons/setting.svg';
import GroupModal from '@pages/group-home/components/group-modal/group-modal';
import MeetingModal from '@pages/group-home/components/meeting-modal/meeting-modal';
import { zIndex } from '@styles/z-index';
import styled from 'styled-components';

const GroupHomeHeader = () => {
  return (
    <S.Container>
      <MeetingModal title="회의 생성">
        <S.Trigger>
          <S.Balloon>회의 생성</S.Balloon>
          <img src={createMeetingButton} />
        </S.Trigger>
      </MeetingModal>

      <GroupModal>
        <S.Trigger>
          <S.Balloon>그룹 관리</S.Balloon>
          <img src={groupManageButton} />
        </S.Trigger>
      </GroupModal>
    </S.Container>
  );
};

export default GroupHomeHeader;

const S = {
  Container: styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 14px;
    position: absolute;
    right: 47px;
    top: 33px;
  `,

  Trigger: styled.div`
    position: relative;
    display: inline-block;

    &:hover > div {
      opacity: 1;
    }
  `,

  Balloon: styled.div`
    opacity: 0;
    transition: opacity 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 81px;
    height: 30px;
    top: 55px;
    left: 50%;
    transform: translateX(-50%);

    background: var(--blue01);
    color: white;
    font-size: 14px;
    border-radius: 10px;
    z-index: ${zIndex.balloon};
    padding-top: 2px;

    &:after {
      border-bottom: 15px solid var(--blue01);
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 0px solid transparent;
      content: '';
      position: absolute;
      top: -50%;
      left: 50%;
      transform: translateX(-50%);
    }
  `,
};
