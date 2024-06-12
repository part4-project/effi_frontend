import { FormEvent, useEffect } from 'react';
import refreshIcon from '@assets/icons/refresh.svg';
import { useUserQuery, useUserNicknameUpdateMutation } from '@hooks/react-query/use-query-user';
import { useToast } from '@hooks/use-toast';
import useValidateText from '@hooks/use-validate-text';
import { createRandomNickName } from '@utils/createRandomNickname';
import styled, { css } from 'styled-components';

const NicknameInput = () => {
  const nickNameUpdate = useUserNicknameUpdateMutation();
  const { data: userData } = useUserQuery();
  const { inputValue, setInputValue, errorMessage, handleInputChange } = useValidateText(2, 7, false);
  const { toast } = useToast();

  const handleNicknameRefreshButtonClick = () => {
    const newNickName = createRandomNickName();
    setInputValue(newNickName);
  };

  const handleNickNameSaveButtonClick = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    nickNameUpdate.mutate(inputValue, {
      onSuccess: () => {
        toast('닉네임이 저장 되었습니다.');
      },
      onError: () => {
        toast('닉네임 저장에 실패했습니다.');
      },
    });
  };

  useEffect(() => {
    if (userData?.nickname) {
      setInputValue(userData.nickname);
    }
  }, []);

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
          onChange={handleInputChange}
        />
        <S.ChangeNicknameButton onClick={handleNickNameSaveButtonClick} disabled={!!errorMessage}>
          저장하기
        </S.ChangeNicknameButton>
        <S.NicknameErrorMessage>{errorMessage}</S.NicknameErrorMessage>
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
    position: relative;
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

  NicknameErrorMessage: styled.strong`
    position: absolute;
    top: 120%;
    left: 3%;
    color: var(--red01);
  `,

  ChangeNicknameButton: styled.button`
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 12px;
    color: var(--white);
    background-color: var(--blue01);
    &:hover {
      background-color: var(--blue04);
    }
    ${(props) =>
      props.disabled &&
      css`
        cursor: auto;
        background-color: var(--gray01);
        &:hover {
          background-color: var(--gray01);
        }
      `}
  `,
};
