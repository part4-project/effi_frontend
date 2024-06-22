import { useEffect, useRef } from 'react';
import ChattingList from '@components/meeting/chatting-list';
import { SOCKET_TYPE } from '@constants/socket-type';
import useChatSocket from '@hooks/socket/use-chat-socket';
import styled from 'styled-components';
import InputForm from './input-form';
import useInputForm from '../hooks/use-input-form';
import { TChatSocketType } from '../types';

interface TChattingProps {
  roomId: number;
}

const Chatting = ({ roomId }: TChattingProps) => {
  const handleSendMessage = () => {
    sendMessage(SOCKET_TYPE.CHAT, inputValue);
  };

  const { inputValue, handleSubmit, handleInputValueChange } = useInputForm(handleSendMessage);
  const { sendMessage, chatSocketList } = useChatSocket(roomId);
  const chatContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // 컴포넌트가 업데이트될 때마다 스크롤을 최하단으로 이동
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatSocketList]);

  return (
    <S.Container>
      <S.ChattingWrap>
        <S.ChattingContainer ref={chatContainerRef}>
          {chatSocketList.map((chatSocket: TChatSocketType, idx) => (
            <ChattingList key={idx} roomType="meeting-room" socket={chatSocket} />
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
    height: 60%;
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
      background: var(--gray03);
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
    border-top: 2px solid var(--gray01);
    padding-left: 10px;
    padding-right: 10px;
  `,
  Form: styled.form`
    width: 100%;
    padding: 16px;
    height: 50%;
    border-radius: 36px;
    border: 1px solid var(--gray01);
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
    font-family: 'Pretendard';
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
