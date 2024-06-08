import TestImg from '@assets/profile-test-img.gif';
import ProfileModalButton from '@components/modal/profile-modal/profile-modal-button';
import styled from 'styled-components';

const Profile = () => {
  return (
    <ProfileModalButton>
      <S.ProfileBox>
        <S.NickNameBox>홍길동</S.NickNameBox>
        <S.ProfileImgBox>
          <img src={TestImg} alt="test" />
        </S.ProfileImgBox>
      </S.ProfileBox>
    </ProfileModalButton>
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
    color: #343c49;
    font-weight: 500;
  `,
  ProfileImgBox: styled.div`
    overflow: hidden;
    border: 0.1px solid var(--blue01);
    width: 20px;
    border-radius: 100%;
  `,
};
