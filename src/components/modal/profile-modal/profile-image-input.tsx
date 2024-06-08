import { ChangeEvent, useState } from 'react';
import { USER } from '@constants/mockdata';
import styled from 'styled-components';

const ProfileImageInput = () => {
  const [imgSrc, setImgSrc] = useState(USER.profile_img);

  const handleImgInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageSrc = URL.createObjectURL(e.target.files[0]);
      setImgSrc(imageSrc);
    }
  };

  return (
    <S.Container>
      <S.ProfileImgInputWrapper>
        <S.ProfileImgInputLabel htmlFor="imgInput" />
        <S.ProfileImgInput type="file" id="imgInput" accept=".jpg, .jpeg, .png" onChange={handleImgInputChange} />
        <S.ProfileImg src={imgSrc} alt="Profile Image" />
      </S.ProfileImgInputWrapper>
    </S.Container>
  );
};

export default ProfileImageInput;

const S = {
  Container: styled.section`
    display: flex;
    justify-content: center;
    margin: 10px 0 40px;
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

  ProfileImgInputLabel: styled.label`
    width: 168px;
    height: 168px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    cursor: pointer;
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
};
