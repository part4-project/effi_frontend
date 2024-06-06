/* eslint-disable no-console */
import { useState } from 'react';
import ChattingList from '@components/meeting/chatting-list';
import { CHAT } from '@constants/mockdata';
import styled from 'styled-components';
import InputForm from './input-form';

const Chatting = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputValue);
    setInputValue('');
  };

  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  return (
    <S.Container>
      <S.ChattingWrap>
        <S.ChattingContainer>
          {CHAT.chat.map((chat) => (
            <ChattingList
              key={chat.id}
              nickname={chat.nickname}
              chat={chat.chat}
              sentTime={chat.sentTime}
              type="meeting-room"
            />
          ))}
        </S.ChattingContainer>
      </S.ChattingWrap>
      <InputForm type="chatting" inputValue={inputValue} onSubmit={handleSubmit} onChange={handleInputValueChange} />
    </S.Container>
  );
};

export default Chatting;

const S = {
  Container: styled.div`
    width: 100%;
    height: 650px;
    border-radius: 10px;
    overflow: hidden;
    background: #4d4f4e;
    border: 2px solid #4d4f4e;
  `,
  ChattingWrap: styled.div`
    height: 85%;
    padding: 10px;
  `,
  ChattingContainer: styled.ul`
    height: 100%;
    display: flex;
    gap: 10px;
    flex-direction: column;
    padding: 10px;
    overflow: auto;

    &::-webkit-scrollbar {
      display: block;
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #f3f3f3;
      border-radius: 16px;
    }

    &::-webkit-scrollbar-track {
      background: #9d9d9d;
    }
  `,
  InputContainer: styled.div`
    display: flex;
    height: 15%;
    justify-content: center;
    align-items: center;
    border-top: 2px solid #9e9e9e;
    padding-left: 10px;
    padding-right: 10px;
  `,
  Form: styled.form`
    width: 100%;
    padding: 16px;
    height: 50%;
    border-radius: 36px;
    border: 1px solid #9e9e9e;
    background: #4d4f4e;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Input: styled.input`
    flex-grow: 1;
    color: var(--white);
    height: 28px;
    background-color: inherit;
    outline: none;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: -0.6px;
  `,
  Button: styled.button`
    width: 24px;
    height: 24px;
  `,
};
