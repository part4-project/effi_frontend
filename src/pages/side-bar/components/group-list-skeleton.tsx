import { groupListSkeletonLength } from '@pages/side-bar/utils/group-list-constants';
import { device } from '@styles/breakpoints';
import { skeleton, skeletonAnimation } from '@styles/skeleton';
import styled from 'styled-components';

interface GroupListSkeletonProps {
  sideBarHeight: number;
}

const GroupListSkeleton = ({ sideBarHeight }: GroupListSkeletonProps) => {
  return (
    <>
      {Array.from({ length: groupListSkeletonLength(sideBarHeight) }).map((_, index) => (
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
