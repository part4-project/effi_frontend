import styled from 'styled-components';

const GroupInvite = () => {
  return (
    <div>
      <S.EmailLabel htmlFor="email">그룹 초대하기</S.EmailLabel>
      <S.EmailInputBox>
        <S.EmailInput id="email" name="email" type="text" placeholder="이메일을 입력해주세요!" />
        <S.EmailSendBtn>초대하기</S.EmailSendBtn>
      </S.EmailInputBox>
    </div>
  );
};

export default GroupInvite;

const S = {
  EmailLabel: styled.label`
    display: inline-block;
    color: var(--gray06);
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
    background-color: #fafafa;
    border: 1px solid var(--gray01);
    border-radius: 5px;
    padding: 12px 15px;
    &::placeholder {
      color: var(--gray02);
      font-size: 14px;
      font-weight: 500;
    }
  `,
  EmailSendBtn: styled.button`
    padding: 12px 30px;
    border-radius: 5px;
    background-color: var(--blue02);
    color: var(--blue01);
    font-size: 14px;
    font-weight: 700;
  `,
};
