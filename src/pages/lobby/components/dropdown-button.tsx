import React, { ReactNode, useState, useRef } from 'react';
import MeetingModal from '@components/modal/meeting-modal';
import styled from 'styled-components';
import QuickButton from './quick-button';
import useOutsideClick from '../hooks/use-outside-click';

interface DropdownButtonProps {
  children: ReactNode;
}

const groupList = ['그룹1', '그룹2', '그룹3', '그룹4'];

const DropdownButton: React.FC<DropdownButtonProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleButtonClick = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  useOutsideClick(ref, handleDropdownClose);

  return (
    <S.DropdownButtonWrapper ref={ref}>
      <QuickButton onClick={handleButtonClick}>{children}</QuickButton>
      <S.DropdownBox $isOpen={isDropdownOpen}>
        {groupList.map((item) => (
          <MeetingModal>
            <S.DropdownList key={item} onClick={handleDropdownClose}>
              {item}
            </S.DropdownList>
          </MeetingModal>
        ))}
      </S.DropdownBox>
    </S.DropdownButtonWrapper>
  );
};

const S = {
  DropdownButtonWrapper: styled.div`
    position: relative;
  `,
  DropdownBox: styled.ul<{ $isOpen: boolean }>`
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    border: 1px solid black;
    border-top: none;
    border-bottom: none;
    width: 100%;
  `,
  DropdownList: styled.li`
    border-bottom: 1px solid black;
    padding: 2px;
    &:hover {
      background-color: #f0f0f0;
    }
  `,
};

export default DropdownButton;
