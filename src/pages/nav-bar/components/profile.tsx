import { TUserInfoRes } from '@api/user/user-request.type';
import ProfileModalButton from '@components/modal/profile-modal/profile-modal-button';
import { QUERY_KEY } from '@constants/query-key';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

const Profile = () => {
  const userData = useQueryClient().getQueryData<TUserInfoRes>([QUERY_KEY.userInfo]);

  return (
    <ProfileModalButton>
      <S.ProfileBox>
        <S.NickNameBox>{userData?.nickname}</S.NickNameBox>
        <S.ProfileImgBox>
          <img src={userData?.profileImageUrl} alt="test" />
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
    color: ${(props) => props.theme.nickName};
    font-weight: 500;
  `,
  ProfileImgBox: styled.div`
    overflow: hidden;
    border: 0.1px solid ${(props) => props.theme.theme01};
    width: 20px;
    height: 20px;
    border-radius: 100%;
  `,
};
