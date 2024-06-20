import { useRef } from 'react';
import GroupList from '@pages/side-bar/components/group-list';
import GroupCreateModalButton from '@pages/side-bar/components/modal/group-create-modal-button';
import useRefSize from '@pages/side-bar/hooks/use-ref-size';
import { device } from '@styles/breakpoints';
import { navBarHeight, sideBarWidth } from '@styles/subsection-size';
import { zIndex } from '@styles/z-index';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

const SideBar = () => {
  const theme = useTheme();
  const sideBarRef = useRef(null);
  const { refHeight } = useRefSize(sideBarRef);

  return (
    <S.SideWrap ref={sideBarRef}>
      <S.ButtonList>
        <S.Trigger>
          <Link to={'/'}>
            <img src={theme.lobbyBtn} alt="home" />
          </Link>
          <S.Balloon>로비로 가기</S.Balloon>
        </S.Trigger>
        <S.Trigger>
          <GroupCreateModalButton>
            <img src={theme.addGroupBtn} alt="add" />
          </GroupCreateModalButton>
          <S.Balloon>그룹 추가하기</S.Balloon>
        </S.Trigger>
        <GroupList sideBarHeight={refHeight} />
      </S.ButtonList>
    </S.SideWrap>
  );
};

export default SideBar;

const S = {
  SideWrap: styled.aside`
    width: ${sideBarWidth.desktop};
    padding: 26px 18px;
    position: fixed;
    left: 0;
    top: ${navBarHeight.desktop};
    background-color: ${(props) => props.theme.theme06};
    height: 100%;
    z-index: ${zIndex.sideBar};
    @media ${device.tablet} {
      width: ${sideBarWidth.tablet};
      top: ${navBarHeight.tablet};
    }
    @media ${device.mobile} {
      width: ${sideBarWidth.mobile};
      top: ${navBarHeight.mobile};
    }
  `,

  ButtonList: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 9px;
  `,
  Trigger: styled.div`
    position: relative;

    &:hover > div {
      visibility: visible;
      opacity: 1;
    }
  `,

  Balloon: styled.div`
    visibility: hidden;
    opacity: 0;
    position: absolute;
    width: max-content;
    max-width: 250%;
    top: 50%;
    left: 130%;
    transform: translate3d(0, -50%, 0);
    background: ${(props) => props.theme.theme01};
    color: var(--white);
    font-size: 14px;
    border-radius: 10px;
    z-index: ${zIndex.balloon};
    padding: 8px;
    transition:
      opacity 0.2s ease-in-out,
      visibility 0.2s ease-in-out;

    &:after {
      content: '';
      width: 14px;
      height: 13px;
      background-image: url('${(props) => props.theme.polygonLeft}');
      background-size: cover;
      background-repeat: no-repeat;
      position: absolute;
      top: 50%;
      left: -4px;
      transform: translate3d(-50%, -50%, 0);
    }
  `,
};
