import TestImg from '@assets/profile-test-img.gif';
import UserInfoModal from '@components/modal/user-info-modal';
import styled from 'styled-components';

const Profile = () => {
  return (
    <UserInfoModal>
      <S.ProfileBox>
        <S.NickNameBox>홍길동</S.NickNameBox>
        <S.ProfileImgBox>
          <img src={TestImg} alt="test" />
        </S.ProfileImgBox>
      </S.ProfileBox>
    </UserInfoModal>
  );
};

export default Profile;

const S = {
  ProfileBox: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  `,
  NickNameBox: styled.div`
    color: #367262;
    font-weight: 500;
  `,
  ProfileImgBox: styled.div`
    overflow: hidden;
    border: 0.1px solid #367262;
    width: 20px;
    border-radius: 100%;
  `,
};
