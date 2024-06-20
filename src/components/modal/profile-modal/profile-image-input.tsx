import { ChangeEvent } from 'react';
import { TUserInfoRes } from '@api/user/user-request.type';
import refreshIcon from '@assets/icons/refresh.svg';
import { QUERY_KEY } from '@constants/query-key';
import { useUserProfileImgDefaultMutation, useUserProfileImgUpdateMutation } from '@hooks/react-query/use-query-user';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

const ProfileImageInput = () => {
  const userInfo = useQueryClient().getQueryData<TUserInfoRes>([QUERY_KEY.userInfo]);
  const { mutate: profileImgUpdateMutate, isPending: isProfileImgUpdatePending } = useUserProfileImgUpdateMutation();
  const { mutate: defaultImgMutate, isPending: isDefaultImgPending } = useUserProfileImgDefaultMutation();

  const handleImgInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      profileImgUpdateMutate(file);
    }
  };

  const handleDefaultImgButtonClick = () => {
    defaultImgMutate();
  };

  return (
    <S.Container>
      <S.ProfileImgInputWrapper>
        <S.ProfileImgInputLabel $isPending={isProfileImgUpdatePending || isDefaultImgPending} htmlFor="imgInput" />
        <S.ProfileImgInput
          type="file"
          id="imgInput"
          accept=".jpg, .jpeg, .png, .svg"
          onChange={handleImgInputChange}
          disabled={isProfileImgUpdatePending || isDefaultImgPending}
        />
        <S.ProfileImg src={userInfo?.profileImageUrl} alt="Profile Image" />
      </S.ProfileImgInputWrapper>
      <S.DefaultImgButton src={refreshIcon} alt="기본 이미지 버튼" onClick={handleDefaultImgButtonClick} />
    </S.Container>
  );
};

export default ProfileImageInput;

const S = {
  Container: styled.section`
    display: flex;
    justify-content: center;
    margin: 10px 0 40px;
    position: relative;
  `,

  ProfileImgInputWrapper: styled.div`
    width: 168px;
    height: 168px;
    border-radius: 120px;
    background: var(--white);
    border: 4px solid var(--gray03);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  `,

  ProfileImgInputLabel: styled.label<{ $isPending: boolean }>`
    width: 168px;
    height: 168px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    cursor: ${({ $isPending }) => ($isPending ? 'not-allowed' : 'pointer')};
    position: absolute;
  `,

  ProfileImgInput: styled.input`
    width: 0;
    height: 0;
  `,

  ProfileImg: styled.img`
    position: absolute;
    object-fit: cover;
    width: 168px;
    height: 168px;
    pointer-events: none;
  `,
  DefaultImgButton: styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 60%;
    transform: translateX(-60%);
  `,
};
