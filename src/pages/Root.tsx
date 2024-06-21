import Toaster from '@components/toast/toaster';
import NavBar from '@pages/nav-bar';
import SideBar from '@pages/side-bar';
import { device } from '@styles/breakpoints';
import GlobalStyle from '@styles/global';
import { navBarHeight, sideBarWidth } from '@styles/subsection-size';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Root = () => {
  const location = useLocation();

  const nonSubSectionArray = ['/', '/group-home'];
  const isSubSection = nonSubSectionArray.includes(location.pathname);

  return (
    <>
      {isSubSection && (
        <>
          <NavBar />
          <SideBar />
        </>
      )}
      <GlobalStyle />
      <S.Main $isSubSection={isSubSection}>
        <Toaster />
        <Outlet />
      </S.Main>
    </>
  );
};

export default Root;

const S = {
  Main: styled.main<{ $isSubSection: boolean }>`
    min-width: 300px;
    ${({ $isSubSection }) =>
      $isSubSection &&
      `
      margin: ${navBarHeight.desktop} 0 0 ${sideBarWidth.desktop};
      min-height: calc(100vh - ${navBarHeight.desktop});
      @media ${device.tablet} {
        margin: ${navBarHeight.tablet} 0 0 ${sideBarWidth.tablet};
        min-height: calc(100vh - ${navBarHeight.tablet});
      }
      @media ${device.mobile} {
        margin: ${navBarHeight.mobile} 0 0 ${sideBarWidth.mobile};
        min-height: calc(100vh - ${navBarHeight.mobile});
      }
    `}
  `,
};
