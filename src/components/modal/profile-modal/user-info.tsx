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

  useEffect(() => {
    setNickName(createRandomNickName());
  }, []);

  useEffect(() => {
    setInputValue(nickName);
  }, [nickName]);

  return (
    <S.UserInfo>
      <S.ProfileImgInputSection>
        <S.ProfileImgInputWrapper>
          <S.ProfileImgLInputLabel htmlFor="imgInput">+</S.ProfileImgLInputLabel>
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
            onChange={(e) => setInputValue(e.target.value)}
          />
          <S.ChangeNicknameButton>변경하기</S.ChangeNicknameButton>
        </S.Nickname>
      </S.NicknameAndLogoutBox>
    </S.UserInfo>
  );
};

export default UserInfo;

const S = {
  UserInfo: styled.div``,

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
    border: 4px solid #f1f1f1;
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
    border-bottom: 1px solid #bdbdbd;
  `,

  NicknameInput: styled.input`
    font-size: 16px;
    font-weight: bold;
    padding: 12px 10px;
  `,

  ChangeNicknameButton: styled.button`
    padding: 6px 10px;
    border-radius: 4px;
    background-color: #c1c1c1;
    font-size: 12px;
    color: var(--white);
    background-color: var(--blue01);
  `,

  LogoutButton: styled.button`
    width: 100%;
    height: 69px;
    border-radius: 10px;
    background: #f1f1f1;
  `,
};
