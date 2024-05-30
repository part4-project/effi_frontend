import { useState } from 'react';
import styled from 'styled-components';
import Modal from './modal';

interface GroupModalProps {
  children: React.ReactNode;
}

const UserInfoModal = ({ children }: GroupModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen(true);
  };

  return (
    <button onClick={handleOpenClick}>
      {children}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <S.Container>
          <S.CloseButton>{/* TODO: close img 추가후 닫기 구현하기 */}</S.CloseButton>
          <S.UserInfoContainer>
            <S.ProfileImg src="" alt="프로필이미지" />
            <S.NicknameAndLogoutBox>
              <S.Nickname>
                닉네임
                <S.SaveButton>저장하기</S.SaveButton>
              </S.Nickname>
              <S.LogoutButton>로그아웃</S.LogoutButton>
            </S.NicknameAndLogoutBox>
          </S.UserInfoContainer>
          <S.InviteList>초대목록</S.InviteList>
          <S.DeleteAccountButton>회원탈퇴</S.DeleteAccountButton>
        </S.Container>
      </Modal>
    </button>
  );
};

export default UserInfoModal;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 11px;
    padding-top: 20px;
    position: relative;
  `,
  CloseButton: styled.button`
    width: 20px;
    height: 20px;
    position: absolute;
    top: -10px;
    right: -10px;
  `,
  UserInfoContainer: styled.div`
    display: flex;
    gap: 21px;
  `,
  ProfileImg: styled.img`
    width: 30%;
    height: 157px;
    border-radius: 10px;
    background: #f1f1f1;
  `,
  NicknameAndLogoutBox: styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 9px;
  `,
  Nickname: styled.div`
    width: 100%;
    height: 69px;
    border-radius: 10px;
    background: #f1f1f1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 23px;
  `,
  SaveButton: styled.button`
    width: 149px;
    height: 40px;
    opacity: 0.4;
    background: #c1c1c1;
  `,
  LogoutButton: styled.button`
    width: 100%;
    height: 69px;
    border-radius: 10px;
    background: #f1f1f1;
  `,
  InviteList: styled.div`
    width: 100%;
    height: 178px;
    border-radius: 10px;
    background: #f1f1f1;
  `,
  DeleteAccountButton: styled.button`
    text-align: left;
  `,
};
