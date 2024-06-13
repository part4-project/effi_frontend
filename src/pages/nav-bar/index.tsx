import { darkModeStore } from '@stores/darkmode';
import { device } from '@styles/breakpoints';
import { navBarHeight } from '@styles/subsection-size';
import { zIndex } from '@styles/z-index';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import Alarm from './components/alarm';
import Profile from './components/profile';
import SearchBar from './components/search-bar';

const NavBar = () => {
  const theme = useTheme();
  //다크모드 테스트 용 입니다.
  const { isDarkMode, onDarkMode, onLightMode } = darkModeStore();

  const handleDarkModeClick = () => {
    isDarkMode ? onLightMode() : onDarkMode();
  };

  return (
    <S.NavWrap>
      <S.NavContainer>
        <S.FlexLeftBox>
          <div>
            <Link to={'/'}>
              <img src={theme.textLogo} alt="text-logo" />
            </Link>
          </div>
        </S.FlexLeftBox>
        <S.FlexRightBox>
          <button onClick={handleDarkModeClick}>다크 모드</button>
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
    background-color: ${(props) => props.theme.theme04};
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
};
