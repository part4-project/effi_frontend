import { ChangeEvent, useState } from 'react';
import refreshIcon from '@assets/icons/refresh.svg';
import { createRandomNickName } from '@utils/createRandomNickname';
import styled from 'styled-components';

const NicknameInput = () => {
  const [randNickName, setRandNickName] = useState(createRandomNickName());
  const [inputValue, setInputValue] = useState(randNickName);

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
        <S.ChangeNicknameButton>저장하기</S.ChangeNicknameButton>
      </S.NicknameForm>
    </S.Container>
  );
};

export default NicknameInput;

const S = {
  Container: styled.section`
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
