import CreateGroupModal from '@components/modal/create-group-modal ';
import { device } from '@styles/breakpoints';
import { navBarHeight, sideBarWidth } from '@styles/subsection-size';
import styled from 'styled-components';

const SideBar = () => {
  return (
    <S.SideWrap>
      SideBar입니다!
      <S.AddGroup>
        <p>그룹</p>
        <CreateGroupModal>
          <div>+</div>
        </CreateGroupModal>
      </S.AddGroup>
    </S.SideWrap>
  );
};

export default SideBar;

const S = {
  SideWrap: styled.div`
    width: ${sideBarWidth.desktop};
    position: fixed;
    left: 0;
    top: ${navBarHeight.desktop};
    background-color: #c1c1c1;
    height: 100%;
    z-index: 98;
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
    justify-content: space-around;
    align-items: center;
  `,
};
