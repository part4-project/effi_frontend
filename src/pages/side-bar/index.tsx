import GroupCreateModal from '@pages/side-bar/components/modal/group-create-modal';
import { device } from '@styles/breakpoints';
import { navBarHeight, sideBarWidth } from '@styles/subsection-size';
import { zIndex } from '@styles/z-index';
import styled from 'styled-components';
import GroupList from './components/group-list';

const SideBar = () => {
  return (
    <S.SideWrap>
      <S.AddGroup>
        <p>그룹</p>
        <GroupCreateModal>+</GroupCreateModal>
      </S.AddGroup>
      <GroupList />
    </S.SideWrap>
  );
};

export default SideBar;

const S = {
  SideWrap: styled.div`
    width: ${sideBarWidth.desktop};
    padding: 24px;
    position: fixed;
    left: 0;
    top: ${navBarHeight.desktop};
    background-color: #c1c1c1;
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

  AddGroup: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
  `,
};
