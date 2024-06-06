/* eslint-disable no-unused-vars */
import styled from 'styled-components';

interface DropDownSelectorProps {
  timeList: string[];
  onClick: (selectedTime: string) => void;
}

const DropDownSelector = ({ timeList = [], onClick }: DropDownSelectorProps) => {
  const handleItemClick = (time: string) => {
    onClick(time);
  };

  return (
    <S.Container>
      {timeList.map((time) => (
        <S.SelectList key={time} onClick={() => handleItemClick(time)}>
          {time}
        </S.SelectList>
      ))}
    </S.Container>
  );
};

export default DropDownSelector;

const S = {
  Container: styled.ul`
    position: absolute;
    width: 90px;
    height: 150px;
    border-radius: 5px;
    border: 1px solid #9e9e9e;
    background: var(--white);
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: auto;
  `,

  SelectList: styled.li`
    color: #9e9e9e;
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    padding: 1px 10px;
    cursor: pointer;

    &:hover {
      background: #f3f3f3;
    }
  `,
};
