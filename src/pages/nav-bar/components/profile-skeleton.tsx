import { skeleton, skeletonAnimation } from '@styles/skeleton';
import styled from 'styled-components';

const ProfileSkeleton = () => {
  return (
    <S.ProfileBox>
      <S.NickNameBox></S.NickNameBox>
      <S.ProfileImgBox></S.ProfileImgBox>
    </S.ProfileBox>
  );
};

export default ProfileSkeleton;

const S = {
  ProfileBox: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  `,
  NickNameBox: styled.div`
    width: 82px;
    height: 20px;
    ${skeleton}
    &::before {
      ${skeletonAnimation};
    }
  `,
  ProfileImgBox: styled.div`
    width: 20px;
    height: 20px;
    border-radius: 100%;
    ${skeleton}
    &::before {
      ${skeletonAnimation};
    }
  `,
};
