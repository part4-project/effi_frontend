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
    width: 100px;
    height: 150px;
    border-radius: 5px;
    border: 1px solid var(--gray01);
    background: var(--white);
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: auto;
  `,

  SelectList: styled.li`
    color: var(--gray01);
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    padding: 1px 10px;
    cursor: pointer;

    &:hover {
      background: var(--gray03);
    }
  `,
};
