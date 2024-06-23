import { useEffect } from 'react';
import { useUserNicknameUpdateMutation, useUserQuery } from '@hooks/react-query/use-query-user';
import { device } from '@styles/breakpoints';
import { navBarHeight } from '@styles/subsection-size';
import { zIndex } from '@styles/z-index';
import { createRandomNickName } from '@utils/createRandomNickname';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import Alarm from './components/alarm';
import DarkModeButton from './components/dark-mode-button';
import Profile from './components/profile';
import ProfileSkeleton from './components/profile-skeleton';

const NavBar = () => {
  const theme = useTheme();

  const { data: userData, isLoading, isError, isSuccess } = useUserQuery();
  const { mutateAsync } = useUserNicknameUpdateMutation();

  useEffect(() => {
    if (isSuccess && userData?.nickname.length === 0) {
      mutateAsync(createRandomNickName());
    }
  }, [isSuccess, userData, mutateAsync]);

  if (isError) return 'Error...';

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
          <DarkModeButton />
          {isLoading ? (
            <ProfileSkeleton />
          ) : (
            <>
              <Alarm />
              <Profile />
            </>
          )}
          {/* <Alarm /> */}
          {/* {isLoading ? <ProfileSkeleton /> : <Profile />} */}
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
    @media ${device.tablet} {
      padding-inline: 62px 67px;
    }
    @media ${device.mobile} {
      padding-inline: 22px 27px;
    }
  `,
  FlexLeftBox: styled.div``,
  FlexRightBox: styled.div`
    display: flex;
    gap: 25px;
  `,
};
