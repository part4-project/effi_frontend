import { useEffect } from 'react';
import ProfileModalButton from '@components/modal/profile-modal/profile-modal-button';
import { useUserNicknameUpdateMutation, useUserQuery } from '@hooks/react-query/use-query-user';
import { createRandomNickName } from '@utils/createRandomNickname';
import styled from 'styled-components';

const Profile = () => {
  const { data: userData, isLoading, isError, isSuccess } = useUserQuery();
  const { mutateAsync } = useUserNicknameUpdateMutation();

  useEffect(() => {
    if (isSuccess && userData?.nickname.length === 0) {
      mutateAsync(createRandomNickName());
    }
  }, [isSuccess, userData, mutateAsync]);

  if (isLoading) return 'Loading...';

  if (isError) return 'Error...';

  return (
    <ProfileModalButton>
      <S.ProfileBox>
        <S.NickNameBox>{userData.nickname}</S.NickNameBox>
        <S.ProfileImgBox>
          <img src={userData.profileImageUrl} alt="test" />
        </S.ProfileImgBox>
      </S.ProfileBox>
    </ProfileModalButton>
  );
};

export default Profile;

const S = {
  ProfileBox: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  `,
  NickNameBox: styled.div`
    color: #343c49;
    font-weight: 500;
  `,
  ProfileImgBox: styled.div`
    overflow: hidden;
    border: 0.1px solid var(--blue01);
    width: 20px;
    height: 20px;
    border-radius: 100%;
  `,
};
