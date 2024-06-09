/* eslint-disable no-unused-vars */
import { useMemo } from 'react';
import subTractIcon from '@assets/icons/subtract.svg';
import styled from 'styled-components';

type MeetingRoomInputForm = 'topic' | 'chatting';

interface InputFormProps {
  type: MeetingRoomInputForm;
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const InputForm = ({ type, inputValue, onSubmit, onChange }: InputFormProps) => {
  const CONTAINERS = useMemo(
    () => ({
      topic: (
        <>
          <S.Container>
            <S.Input type="text" placeholder="안건 내용 작성하기" value={inputValue} onChange={onChange} />
          </S.Container>
          <S.TopicButton>추가</S.TopicButton>
        </>
      ),
      chatting: (
        <S.Container>
          <S.Input type="text" placeholder="메시지 입력..." value={inputValue} onChange={onChange} />
          <S.ChattingButton>
            <img src={subTractIcon} alt="전송" />
          </S.ChattingButton>
        </S.Container>
      ),
    }),
    [inputValue, onChange],
  );

  return (
    <S.Form $type={type} onSubmit={onSubmit}>
      {CONTAINERS[type]}
    </S.Form>
  );
};

export default InputForm;

const S = {
  Form: styled.form<{ $type: MeetingRoomInputForm }>`
    display: flex;
    height: ${({ $type }) => ($type === 'chatting' ? '15%' : '25%')};
    justify-content: center;
    align-items: center;
    border-top: ${({ $type }) => ($type === 'chatting' ? '2px solid var(--gray01)' : 'none')};
    padding-left: ${({ $type }) => ($type === 'chatting' ? '10px' : '0')};
    padding-right: ${({ $type }) => ($type === 'chatting' ? '10px' : '0')};
  `,
  Container: styled.div`
    width: 100%;
    padding: 16px;
    height: 60%;
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
  ChattingButton: styled.button`
    width: 24px;
    height: 24px;
  `,
  TopicButton: styled.button`
    width: 109px;
    height: 60%;
    margin-left: 8px;
    border-radius: 36px;
    border: 1px solid var(--gray-01, #9e9e9e);
    background: var(--gray-01, #9e9e9e);
    color: var(--white);
    text-align: center;
    font-family: 'Pretendard';
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,
};
