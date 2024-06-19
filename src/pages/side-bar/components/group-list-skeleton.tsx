import { device } from '@styles/breakpoints';
import { skeleton, skeletonAnimation } from '@styles/skeleton';
import styled from 'styled-components';

const GroupListSkeleton = () => {
  const groupBoxLength = () => {
    const gap = 9;
    const mobile = 23.7;
    const tablet = 32.8;
    const desktop = 42;
    let groupBoxLength;

    if (window.innerWidth <= 767) {
      // Mobile
      groupBoxLength = Math.floor(window.innerHeight / (mobile + gap) - 4);
    } else if (window.innerWidth <= 1280) {
      // Tablet
      groupBoxLength = Math.floor(window.innerHeight / (tablet + gap) - 4);
    } else {
      // Desktop
      groupBoxLength = Math.floor(window.innerHeight / (desktop + gap) - 3);
    }

    return groupBoxLength;
  };

  return (
    <>
      {Array.from({ length: groupBoxLength() }).map((_, index) => (
        <S.GroupListBox key={index} />
      ))}
    </>
  );
};

export default GroupListSkeleton;

const S = {
  GroupListBox: styled.div`
    width: 46px;
    height: 42px;
    border-radius: 10px;
    ${skeleton}
    &::before {
      ${skeletonAnimation};
    }
    @media ${device.tablet} {
      width: 36px;
      height: 32.8px;
    }
    @media ${device.mobile} {
      width: 26px;
      height: 23.7px;
    }
  `,
};
