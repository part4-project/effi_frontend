import { ChangeEvent, useEffect, useState } from 'react';
import { USER } from '@constants/mockdata';
import { createRandomNickName } from '@utils/createRandomNickname';
import styled from 'styled-components';

const UserInfo = () => {
  const [nickName, setNickName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [imgSrc, setImgSrc] = useState(USER.profile_img);

  const handleImgInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageSrc = URL.createObjectURL(e.target.files[0]);
      setImgSrc(imageSrc);
    }
  };

  const handleNicknameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setNickName(createRandomNickName());
  }, []);

  useEffect(() => {
    setInputValue(nickName);
  }, [nickName]);

  return (
    <S.Container>
      <S.ProfileImgInputSection>
        <S.ProfileImgInputWrapper>
          <S.ProfileImgLInputLabel htmlFor="imgInput" />
          <S.ProfileImgInput type="file" id="imgInput" accept="image/*" onChange={handleImgInputChange} />
          <S.ProfileImg src={imgSrc} />
        </S.ProfileImgInputWrapper>
      </S.ProfileImgInputSection>

      <S.NicknameAndLogoutBox>
        <S.NicknameLabel htmlFor="nickname">닉네임</S.NicknameLabel>
        <S.Nickname>
          <S.NicknameInput
            type="text"
            id="nickname"
            placeholder="닉네임"
            value={inputValue}
            onChange={handleNicknameInputChange}
          />
          <S.ChangeNicknameButton>변경하기</S.ChangeNicknameButton>
        </S.Nickname>
      </S.NicknameAndLogoutBox>
    </S.Container>
  );
};

export default UserInfo;

const S = {
  Container: styled.div``,

  ProfileImgInputSection: styled.div`
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

  ProfileImgLInputLabel: styled.label`
    width: 168px;
    height: 168px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    cursor: pointer;
  `,

  ProfileImgInput: styled.input`
    width: 0;
    height: 0;
  `,

  ProfileImg: styled.img`
    position: absolute;
    pointer-events: none;
    object-fit: cover;
    overflow: hidden;
    width: 168px;
    height: 168px;
    pointer-events: none;
  `,

  NicknameAndLogoutBox: styled.div`
    width: 308px;
    display: flex;
    flex-direction: column;
  `,

  NicknameLabel: styled.label`
    font-size: 16px;
    font-weight: bold;
    color: var(--blue05);
    margin-bottom: 12px;
  `,

  Nickname: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--gray02);
  `,

  NicknameInput: styled.input`
    font-size: 16px;
    font-weight: bold;
    padding: 12px 10px;
  `,

  ChangeNicknameButton: styled.button`
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 12px;
    color: var(--white);
    background-color: var(--blue01);
  `,
};
