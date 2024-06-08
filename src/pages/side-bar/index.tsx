import AddGroupBtn from '@assets/add-group-btn.svg';
import LobbyBtn from '@assets/lobby-btn.svg';
import GroupCreateModal from '@pages/side-bar/components/modal/group-create-modal';
import { device } from '@styles/breakpoints';
import { navBarHeight, sideBarWidth } from '@styles/subsection-size';
import { zIndex } from '@styles/z-index';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import GroupList from './components/group-list';

const SideBar = () => {
  return (
    <S.SideWrap>
      <S.ButtonList>
        <S.Trigger>
          <Link to={'/'}>
            <img src={LobbyBtn} alt="home" />
          </Link>
          <S.Balloon>로비로 가기</S.Balloon>
        </S.Trigger>
        <S.Trigger>
          <GroupCreateModal>
            <img src={AddGroupBtn} alt="add" />
          </GroupCreateModal>
          <S.Balloon>그룹 추가하기</S.Balloon>
        </S.Trigger>
        <GroupList />
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
    background-color: var(--white);
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
    background: var(--blue01);
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
      background-image: url('/polygon-left.svg');
      background-size: cover;
      background-repeat: no-repeat;
      position: absolute;
      top: 50%;
      left: -4px;
      transform: translate3d(-50%, -50%, 0);
    }
  `,
};
