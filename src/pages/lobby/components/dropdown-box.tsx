import React from 'react';
import polygonTopIcon from '@assets/icons/polygon-top.svg';
import styled from 'styled-components';

interface DropDownBox extends React.PropsWithChildren {
  isDropdownOpen: boolean;
}

const DropDownBox = ({ isDropdownOpen, children }: DropDownBox) => {
  return (
    <>
      <S.Container $isDropdownOpen={isDropdownOpen}>
        <S.Polygon src={polygonTopIcon} alt="위쪽" />
        <S.ListBox>{children}</S.ListBox>
      </S.Container>
    </>
  );
};

export default DropDownBox;

const S = {
  Container: styled.div<{ $isDropdownOpen: boolean }>`
    display: ${({ $isDropdownOpen }) => ($isDropdownOpen ? 'flex' : 'none')};
    gap: 13px;
    max-width: 722px;
    padding: 18px 29px;
    position: absolute;
    top: 180%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--blue03);
    border-radius: 10px;
  `,
  ListBox: styled.div`
    display: flex;
    max-width: 722px;
    gap: 13px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: block;
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #d6d6d7;
      border-radius: 2px;
    }

    &::-webkit-scrollbar-track {
      background: var(--gray03);
    }
  `,
  Polygon: styled.img`
    width: 17px;
    height: 21px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};
