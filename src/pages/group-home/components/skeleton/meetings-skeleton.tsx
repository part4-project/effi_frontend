import { skeleton, skeletonAnimation } from '@styles/skeleton';
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
    gap: 30px;
    margin-bottom: 90px;
  `,
  MeetingBox: styled.div`
    position: relative;
    background-color: var(--white);
    border-radius: 20px;
    aspect-ratio: 7/4;
    width: 472px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    ${skeleton}
    &::before {
      ${skeletonAnimation}
    }
  `,
};
