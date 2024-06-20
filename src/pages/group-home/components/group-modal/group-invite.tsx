import { MouseEvent, useRef } from 'react';
import { useGroupInviteMutation } from '@hooks/react-query/use-query-group';
import { useGroupStore } from '@stores/group';
import styled from 'styled-components';

const GroupInvite = () => {
  const { mutate } = useGroupInviteMutation(useGroupStore((state) => state.groupId));
  const emailRef = useRef<HTMLInputElement>(null);
  const handleSubmitBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (emailRef.current) {
      mutate(emailRef.current.value);
    }
  };

  return (
    <div>
      <S.EmailLabel htmlFor="email">그룹 초대하기</S.EmailLabel>
      <S.EmailInputBox>
        <S.EmailInput ref={emailRef} id="email" name="email" type="text" placeholder="이메일을 입력해주세요!" />
        <S.EmailSendBtn onClick={handleSubmitBtnClick}>초대하기</S.EmailSendBtn>
      </S.EmailInputBox>
    </div>
  );
};

export default GroupInvite;

const S = {
  EmailLabel: styled.label`
    display: inline-block;
    color: ${(props) => props.theme.text09};
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 6px;
  `,
  EmailInputBox: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  `,
  EmailInput: styled.input`
    flex: 1 1 auto;
    background-color: ${(props) => props.theme.theme07};
    border: 1px solid var(--gray01);
    border-radius: 5px;
    padding: 12px 15px;
    &::placeholder {
      color: ${(props) => props.theme.text10};
      font-size: 14px;
      font-weight: 500;
    }
  `,
  EmailSendBtn: styled.button`
    padding: 12px 30px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.theme02};
    color: ${(props) => props.theme.text06};
    font-size: 14px;
    font-weight: 700;
    &:hover {
      background: ${(props) => props.theme.theme01};
      color: var(--dark08);
    }
  `,
};
