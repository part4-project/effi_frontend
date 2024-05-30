import UserInfoModal from '@components/modal/user-info-modal';
import { device } from '@styles/breakpoints';
import { navBarHeight } from '@styles/subsection-size';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = () => {
  return (
    <S.NavWrap>
      <S.NavContainer>
        <S.FlexLeftBox>
          <S.LogoBox>
            <Link to={'/'}>로고</Link>
          </S.LogoBox>
        </S.FlexLeftBox>
        <S.FlexRightBox>
          <S.SearchBarBox>검색</S.SearchBarBox>
          <S.AlarmBox>알림</S.AlarmBox>
          <UserInfoModal>
            <S.ProfileBox>프로필</S.ProfileBox>
          </UserInfoModal>
        </S.FlexRightBox>
      </S.NavContainer>
    </S.NavWrap>
  );
};

export default NavBar;

const S = {
  NavWrap: styled.nav`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: ${navBarHeight.desktop};
    background-color: #c1c1c1;
    z-index: 98;
    @media ${device.tablet} {
      height: ${navBarHeight.tablet};
    }
    @media ${device.mobile} {
      height: ${navBarHeight.mobile};
    }
  `,
  NavContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 13px;
  `,
  FlexLeftBox: styled.div``,
  FlexRightBox: styled.div`
    display: flex;
    gap: 8px;
  `,
  LogoBox: styled.div``,
  SearchBarBox: styled.div``,
  AlarmBox: styled.div``,
  ProfileBox: styled.div``,
};
