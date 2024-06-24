import { skeleton, skeletonAnimation } from '@styles/skeleton';
import { device } from '@styles/breakpoints';
import styled from 'styled-components';

const MeetingsSkeleton = () => {
  return (
    <S.Container>
      <S.MeetingBox />
      <S.MeetingBox />
    </S.Container>
  );
};

export default MeetingsSkeleton;

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin-bottom: 90px;
    @media ${device.tablet} {
      margin-bottom: 60px;
    }
    @media ${device.mobile} {
      flex-direction: column;
      margin-bottom: 30px;
    }
  `,
  MeetingBox: styled.div`
    position: relative;
    background-color: var(--white);
    border-radius: 20px;
    aspect-ratio: 7/4;
    width: 472px;
    height: 274px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    ${skeleton}
    &::before {
      ${skeletonAnimation}
    }
    @media ${device.mobile} {
      width: 100%;
      min-width: 230px;
      max-width: 360px;
      height: 114px;
      flex-direction: row;
      justify-content: space-between;
      gap: 10px;
      padding: 0 12px;
    }
  `,
};
