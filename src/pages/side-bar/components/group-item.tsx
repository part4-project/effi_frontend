import { useEffect, useRef, useState } from 'react';
import GroupBg from '@assets/group-bg.svg';
import Polygon from '@assets/icons/polygon-left.svg';
import { zIndex } from '@styles/z-index';
import styled from 'styled-components';

interface GroupItemProp {
  id: number;
  room_name: string;
}

const GroupItem: React.FC<GroupItemProp> = ({ room_name }) => {
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
  });

  return (
    <S.Trigger>
      <S.GroupItem ref={groupItemRef} $isOverFlowText={isOverFlowText}>
        <img src={GroupBg} alt="groupImg" />
        <div>{room_name}</div>
      </S.GroupItem>
      <S.Balloon>{room_name}</S.Balloon>
    </S.Trigger>
  );
};

export default GroupItem;

const S = {
  GroupItem: styled.div<{ $isOverFlowText: boolean }>`
    position: relative;
    border-radius: 10%;
    overflow: hidden;
    div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      white-space: nowrap;
      color: var(--blue01);
      font-weight: 900;
      font-size: ${({ $isOverFlowText }) => ($isOverFlowText ? '10px' : '16px')};
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
      /* border-bottom: 10px solid transparent;
      border-left: 10px solid transparent;
      border-right: 10px solid var(--blue01);
      border-top: 10px solid transparent; */
      content: '';
      width: 14px;
      height: 13px;
      background-image: url(${Polygon});
      background-size: cover;
      background-repeat: no-repeat;
      position: absolute;
      top: 50%;
      left: -4px;
      transform: translate3d(-50%, -50%, 0);
    }
  `,
};
