import { useState } from 'react';
import { TAlarm } from '@api/alarm/alarm-request.type';
import ProfileModal from '@components/modal/profile-modal/profile-modal';
import { QUERY_KEY } from '@constants/query-key';
import useAlarmSocket from '@hooks/socket/use-alarm-socket';
import useDropdown from '@pages/lobby/hooks/use-dropdown';
import { useQueryClient } from '@tanstack/react-query';
import styled, { useTheme } from 'styled-components';
import AlarmPopOver from './alarm-popover';

const Alarm = () => {
  const theme = useTheme();
  const { ref, isDropdownOpen, handleDropdownClick, handleDropdownClose } = useDropdown();
  const alarmData = useQueryClient().getQueryData<TAlarm[]>([QUERY_KEY.alarmList]);
  useAlarmSocket();

  const [isOpen, setIsOpen] = useState({
    profile: false,
    confirm: false,
  });

  const handleProfileModalClose = () => {
    //confirm 모달이 열려있으면 닫힘 방지
    if (!isOpen.confirm) {
      setIsOpen((prev) => ({
        ...prev,
        profile: false,
      }));
    }
  };

  const handleProfileModalOpen = () => {
    setIsOpen((prev) => ({
      ...prev,
      profile: true,
    }));
  };

  const handleConfirmModalClose = () => {
    setIsOpen((prev) => ({
      ...prev,
      confirm: false,
    }));
  };

  const handleConfirmModalOpen = () => {
    setIsOpen((prev) => ({
      ...prev,
      confirm: true,
    }));
  };

  return (
    <S.AlarmWrap ref={ref}>
      <div onClick={handleDropdownClick}>
        <S.AlarmImg src={alarmData?.length ? theme.alarmActive : theme.alarm} alt="alarm" />
      </div>
      <ProfileModal
        isOpen={isOpen}
        onProfileClose={handleProfileModalClose}
        onConfirmClose={handleConfirmModalClose}
        onConfirmOpen={handleConfirmModalOpen}
      />
      {isDropdownOpen && (
        <AlarmPopOver handleProfileModalOpen={handleProfileModalOpen} handleDropdownClose={handleDropdownClose} />
      )}
    </S.AlarmWrap>
  );
};

export default Alarm;

const S = {
  AlarmWrap: styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `,
  AlarmImg: styled.img`
    height: initial;
  `,
};
