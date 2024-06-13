import { useEffect, useRef, useState } from 'react';
import { device } from '@styles/breakpoints';
import styled, { useTheme } from 'styled-components';
interface AlarmInviteProp {
  id: number;
  type: string;
  group_name: string;
  remind_time: number;
}
const AlarmInvite = ({ group_name }: AlarmInviteProp) => {
  const theme = useTheme();
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
    <S.AlarmContent>
      <S.AlarmImgBox ref={groupItemRef}>
        <img src={theme.groupBg} alt="alarm" />
        <S.GroupImgInName $isOverFlowText={isOverFlowText}>{group_name}</S.GroupImgInName>
      </S.AlarmImgBox>
      <S.AlarmTextBox>
        <S.AlarmTitle>
          <S.GroupName>{group_name}</S.GroupName>
        </S.AlarmTitle>
        <S.AlarmText>{`${group_name}에서 초대장을 보냈어요!`}</S.AlarmText>
      </S.AlarmTextBox>
    </S.AlarmContent>
  );
};

export default AlarmInvite;

const S = {
  AlarmContent: styled.div`
    display: flex;
    align-items: start;
    gap: 13px;
  `,
  AlarmImgBox: styled.div`
    flex: 0 0 auto;
    position: relative;
    border-radius: 10%;
    overflow: hidden;
  `,
  GroupImgInName: styled.div<{ $isOverFlowText: boolean }>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    white-space: nowrap;
    color: ${(props) => props.theme.theme01};
    font-weight: 900;
    font-size: ${({ $isOverFlowText }) => ($isOverFlowText ? '10px' : '16px')};
    @media ${device.tablet} {
      font-size: ${({ $isOverFlowText }) => ($isOverFlowText ? '8px' : '12px')};
    }
    @media ${device.mobile} {
      font-size: ${({ $isOverFlowText }) => ($isOverFlowText ? '6px' : '8px')};
    }
  `,
  AlarmTextBox: styled.div`
    display: flex;
    flex-direction: column;
  `,
  AlarmTitle: styled.h3`
    font-size: 20px;
    font-weight: 700;
    word-wrap: break-word;
  `,
  AlarmText: styled.p`
    color: ${(props) => props.theme.theme05};
    font-size: 14px;
    font-weight: 500;
    margin-top: 4px;
  `,
  GroupName: styled.p`
    color: ${(props) => props.theme.theme05};
    line-height: 24px;
  `,
};
