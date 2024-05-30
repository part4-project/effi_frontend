import styled from 'styled-components';

const GroupInvite = () => {
  return (
    <S.InviteWrap>
      <S.EmailLabel htmlFor="email">그룹초대하기</S.EmailLabel>
      <S.EmailInputBox>
        <S.EmailInput id="email" name="email" type="text" placeholder="이메일을 입력해주세요" />
        <S.EmailSendBtnBox>
          <S.EmailSendBtn>전송하기</S.EmailSendBtn>
        </S.EmailSendBtnBox>
      </S.EmailInputBox>
    </S.InviteWrap>
  );
};

export default GroupInvite;

const S = {
  InviteWrap: styled.div`
    width: 100%;
  `,
  EmailLabel: styled.label``,
  EmailInputBox: styled.div`
    background-color: #c1c1c1;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
  `,
  EmailInput: styled.input`
    flex-basis: 50%;
    background-color: transparent;
  `,
  EmailSendBtnBox: styled.div`
    padding: 8px 12px;
    border-radius: 8px;
    background-color: #cccccc;
  `,
  EmailSendBtn: styled.button``,
};
