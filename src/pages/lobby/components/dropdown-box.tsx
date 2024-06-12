import React from 'react';
import polygonTopIcon from '@assets/icons/polygon-top.svg';
import polygonWhiteTopIcon from '@assets/icons/polygon-white-top.svg';
import styled from 'styled-components';

interface DropDownBoxProps extends React.PropsWithChildren {
  type: 'make-meeting' | 'schedule-calendar';
  isDropdownOpen: boolean;
}

const DropDownBox = ({ type, isDropdownOpen, children }: DropDownBoxProps) => {
  return (
    <S.Container $type={type} $isDropdownOpen={isDropdownOpen}>
      <S.Polygon $type={type} src={type === 'schedule-calendar' ? polygonWhiteTopIcon : polygonTopIcon} alt="위쪽" />
      <S.ListBox $type={type}>{children}</S.ListBox>
    </S.Container>
  );
};

export default DropDownBox;

const S = {
  Container: styled.div<{ $type: DropDownBoxProps['type']; $isDropdownOpen: boolean }>`
    display: ${({ $isDropdownOpen }) => ($isDropdownOpen ? 'block' : 'none')};
    gap: 13px;
    padding: 18px 29px;
    border-radius: 10px;
    top: ${({ $type }) => $type === 'make-meeting' && '180%'};
    left: ${({ $type }) => $type === 'make-meeting' && '50%'};
    max-width: ${({ $type }) => $type === 'make-meeting' && '722px'};
    width: ${({ $type }) => $type === 'schedule-calendar' && '100%'};
    max-height: ${({ $type }) => $type === 'schedule-calendar' && '25vh'};
    margin-top: ${({ $type }) => $type === 'schedule-calendar' && '15px'};
    background: ${({ $type }) => ($type === 'schedule-calendar' ? 'var(--white)' : 'var(--blue03)')};
    position: ${({ $type }) => ($type === 'schedule-calendar' ? 'auto' : 'absolute')};
    transform: ${({ $type }) => ($type === 'schedule-calendar' ? 'auto' : 'translate(-50%, -50%)')};
  `,
  ListBox: styled.div<{ $type: DropDownBoxProps['type'] }>`
    display: flex;
    max-width: 100%;
    gap: 13px;
    overflow-x: ${({ $type }) => $type === 'make-meeting' && 'auto'};
    overflow-y: ${({ $type }) => $type === 'schedule-calendar' && 'auto'};
    max-height: ${({ $type }) => $type === 'schedule-calendar' && '20vh'};
    flex-direction: ${({ $type }) => ($type === 'schedule-calendar' ? 'column' : 'row')};
    padding-inline-end: ${({ $type }) => $type === 'schedule-calendar' && '9px'};
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
  Polygon: styled.img<{ $type: DropDownBoxProps['type'] }>`
    width: 17px;
    height: 21px;
    position: absolute;
    top: ${({ $type }) => ($type === 'schedule-calendar' ? 'calc(100% + 15px) ' : '-5px')};
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};
