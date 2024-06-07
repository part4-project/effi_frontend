import { ChangeEvent, useState } from 'react';
import refreshIcon from '@assets/icons/refresh.svg';
import { USER } from '@constants/mockdata';
import { createRandomNickName } from '@utils/createRandomNickname';
import styled from 'styled-components';

const UserInfo = () => {
  const [randNickName, setRandNickName] = useState(createRandomNickName());
  const [inputValue, setInputValue] = useState(randNickName);
  const [imgSrc, setImgSrc] = useState(USER.profile_img);

  const handleImgInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageSrc = URL.createObjectURL(e.target.files[0]);
      setImgSrc(imageSrc);
    }
  };

  const handleNicknameRefreshButtonClick = () => {
    const newNickName = createRandomNickName();
    setRandNickName(newNickName);
    setInputValue(newNickName);
  };

  const handleNicknameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <S.Container>
      <S.ProfileImgInputSection>
        <S.ProfileImgInputWrapper>
          <S.ProfileImgInputLabel htmlFor="imgInput" />
          <S.ProfileImgInput type="file" id="imgInput" accept="image/*" onChange={handleImgInputChange} />
          <S.ProfileImg src={imgSrc} alt="Profile Image" />
        </S.ProfileImgInputWrapper>
      </S.ProfileImgInputSection>

      <S.NicknameAndLogoutBox>
        <S.NicknameLabelWrapper>
          <S.NicknameLabel htmlFor="nickname">닉네임</S.NicknameLabel>
          <S.NicknameRefreshButton src={refreshIcon} onClick={handleNicknameRefreshButtonClick} />
        </S.NicknameLabelWrapper>
        <S.NicknameForm>
          <S.NicknameInput
            type="text"
            id="nickname"
            placeholder="닉네임"
            value={inputValue}
            onChange={handleNicknameInputChange}
          />
          <S.ChangeNicknameButton>변경하기</S.ChangeNicknameButton>
        </S.NicknameForm>
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

  NicknameLabelWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 12px;
  `,

  NicknameLabel: styled.label`
    font-size: 16px;
    font-weight: bold;
    color: var(--blue05);
  `,

  NicknameRefreshButton: styled.img`
    width: 17px;
    cursor: pointer;
  `,

  NicknameForm: styled.form`
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
