/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { EXPECTED_END_TIME_LIST } from '@constants/mockdata';
import styled from 'styled-components';
import DropDownSelector from './dropdown-selector';

interface MeetingExpectedTimeProps {
  selectedTime: string;
  onClick: (selectedTime: string) => void;
}

const MeetingExpectedTime = ({ selectedTime, onClick }: MeetingExpectedTimeProps) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleSelectButtonClick = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const handleTimeChange = (selectedTime: string) => {
    onClick(selectedTime);
    setIsDropDownOpen(false);
  };
  return (
    <S.ExpectedMeetingTimeContainer>
      <S.ExpectedTime>
        <S.SelectCustomButton onClick={handleSelectButtonClick}>예상 회의 시간</S.SelectCustomButton>
        {isDropDownOpen && <DropDownSelector timeList={EXPECTED_END_TIME_LIST} onClick={handleTimeChange} />}
      </S.ExpectedTime>
      <S.SelectedValue>{selectedTime}</S.SelectedValue>
    </S.ExpectedMeetingTimeContainer>
  );
};

export default MeetingExpectedTime;

const S = {
  ExpectedMeetingTimeContainer: styled.div`
    display: flex;
    align-items: center;
  `,

  ExpectedTime: styled.div`
    position: relative;
  `,

  SelectedValue: styled.p`
    color: var(--gray01);
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    margin-left: 12px;
  `,
  SelectCustomButton: styled.button`
    color: var(--gray01);
    font-weight: 700;
    line-height: 24px;
    text-decoration-line: underline;
  `,
};
