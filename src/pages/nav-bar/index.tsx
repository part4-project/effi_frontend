import Logo from '@assets/text-logo.svg';
import { device } from '@styles/breakpoints';
import { navBarHeight } from '@styles/subsection-size';
import { zIndex } from '@styles/z-index';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Alarm from './components/alarm';
import Profile from './components/profile';
import SearchBar from './components/search-bar';

const NavBar = () => {
  return (
    <S.NavWrap>
      <S.NavContainer>
        <S.FlexLeftBox>
          <S.LogoBox>
            <Link to={'/'}>
              <img src={Logo} alt="text-logo" />
            </Link>
          </S.LogoBox>
        </S.FlexLeftBox>
        <S.FlexRightBox>
          <SearchBar />
          <Alarm />
          <Profile />
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
    background-color: var(--blue04);
    z-index: ${zIndex.navBar};
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
    padding-inline: 22px 27px;
  `,
  FlexLeftBox: styled.div``,
  FlexRightBox: styled.div`
    display: flex;
    gap: 25px;
  `,
  LogoBox: styled.div``,
};
