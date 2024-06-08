import createMeetingButton from '@assets/icons/plus-monitor.svg';
import polygonTop from '@assets/icons/polygon-top-blue.svg';
import groupManageButton from '@assets/icons/setting.svg';
import GroupModalButton from '@pages/group-home/components/group-modal/group-modal-button';
import MeetingModalButton from '@pages/group-home/components/meeting-modal/meeting-modal-button';
import { zIndex } from '@styles/z-index';
import styled from 'styled-components';

const GroupHomeHeader = () => {
  return (
    <S.Container>
      <MeetingModalButton title="회의 생성">
        <S.Trigger>
          <S.Balloon>회의 생성</S.Balloon>
          <img src={createMeetingButton} />
        </S.Trigger>
      </MeetingModalButton>
      <GroupModalButton>
        <S.Trigger>
          <S.Balloon>그룹 관리</S.Balloon>
          <img src={groupManageButton} />
        </S.Trigger>
      </GroupModalButton>
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

    &:hover > div {
      visibility: visible;
      opacity: 1;
    }
  `,

  Balloon: styled.div`
    visibility: hidden;
    opacity: 0;
    position: absolute;
    width: max-content;
    top: 55px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--blue01);
    color: var(--white);
    font-size: 14px;
    border-radius: 10px;
    z-index: ${zIndex.balloon};
    padding: 6px 15px;
    transition:
      opacity 0.2s ease,
      visibility 0.2s ease-in-out;

    &:after {
      background: url(${polygonTop});
      content: '';
      width: 13px;
      height: 14px;
      position: absolute;
      top: -35%;
      left: calc(50% - 13px / 2);
    }
  `,
};
