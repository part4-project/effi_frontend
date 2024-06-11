import { useEffect, useRef, useState } from 'react';
import GroupBg from '@assets/group-bg.svg';
import { device } from '@styles/breakpoints';
import { zIndex } from '@styles/z-index';
import styled from 'styled-components';

interface GroupItemProp {
  id: number;
  room_name: string;
  type?: 'side-bar' | 'calendar';
}

const GroupItem: React.FC<GroupItemProp> = ({ room_name, type = 'side-bar' }) => {
  const groupItemRef = useRef<HTMLDivElement>(null);
  const [isOverFlowText, setIsOverFlowText] = useState<boolean>(false);

  useEffect(() => {
    // 뒷배경보다 텍스트 길이가 긴지 체크
    const checkOverflow = () => {
      if (groupItemRef.current) {
        const roomName = groupItemRef.current.querySelector('div');
        const bgImg = groupItemRef.current.querySelector('img');
        if (roomName && bgImg) {
          const isOverflowing = roomName.scrollWidth > bgImg.scrollWidth;
          setIsOverFlowText(isOverflowing);
        }
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [isOverFlowText]);

  return (
    <S.Trigger>
      <S.GroupItem ref={groupItemRef}>
        <img src={GroupBg} alt="groupImg" />
        <S.GroupName $isOverFlowText={isOverFlowText}>{room_name}</S.GroupName>
      </S.GroupItem>
      {type === 'side-bar' && <S.Balloon>{room_name}</S.Balloon>}
    </S.Trigger>
  );
};

export default GroupItem;

const S = {
  GroupItem: styled.div`
    position: relative;
    border-radius: 10%;
    overflow: hidden;
  `,
  GroupName: styled.div<{ $isOverFlowText: boolean }>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    white-space: nowrap;
    color: var(--blue01);
    font-weight: 900;
    font-size: ${({ $isOverFlowText }) => ($isOverFlowText ? '10px' : '16px')};
    @media ${device.tablet} {
      font-size: ${({ $isOverFlowText }) => ($isOverFlowText ? '8px' : '12px')};
    }
    @media ${device.mobile} {
      font-size: ${({ $isOverFlowText }) => ($isOverFlowText ? '6px' : '8px')};
    }
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
    max-width: 200%;
    top: 50%;
    left: 130%;
    transform: translate3d(0, -50%, 0);
    background: var(--blue01);
    color: var(--white);
    font-size: 14px;
    border-radius: 10px;
    z-index: ${zIndex.balloon};
    padding: 8px;
    transition:
      opacity 0.2s ease-in-out,
      visibility 0.2s ease-in-out;

    &:after {
      content: '';
      width: 14px;
      height: 13px;
      background: url('/polygon-left.svg');
      position: absolute;
      top: 50%;
      left: -4px;
      transform: translate3d(-50%, -50%, 0);
    }
  `,
};
