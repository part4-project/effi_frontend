import { device } from '@styles/breakpoints';
import { skeleton, skeletonAnimation } from '@styles/skeleton';
import styled from 'styled-components';

const GroupMember = () => {
  return (
    <S.GroupMemberList>
      <S.ImgBox />
      <S.Name />
    </S.GroupMemberList>
  );
};

const GroupHomeSidebarSkeleton = () => {
  return (
    <S.Container>
      <S.GroupNameInput />
      <S.GroupMemberLists>
        {new Array(3).fill(0).map((_, i) => (
          <GroupMember key={i} />
        ))}
      </S.GroupMemberLists>
      <S.LeaveGroupButton />
    </S.Container>
  );
};

export default GroupHomeSidebarSkeleton;

const S = {
  Container: styled.div`
    background-color: ${(props) => props.theme.theme06};
    border-left: 4px solid ${(props) => props.theme.theme03};
    width: 240px;
    padding: 33px 28px;
    position: relative;
    border-radius: 0 20px 20px 0;
    color: ${(props) => props.theme.text05};

    @media ${device.mobile} {
      display: none;
    }
  `,
  GroupNameInput: styled.div`
    width: 100%;
    height: 70px;
    border-radius: 6px;
    ${skeleton}
    &::before {
      ${skeletonAnimation}
    }
  `,
  GroupMemberLists: styled.ul`
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    gap: 23px;
  `,

  GroupMemberList: styled.li`
    display: flex;
    align-items: center;
    gap: 6px;
  `,
  ImgBox: styled.div`
    width: 20px;
    height: 20px;
    border-radius: 100%;
    ${skeleton}
    &::before {
      ${skeletonAnimation}
    }
  `,
  Name: styled.div`
    flex-grow: 1;
    height: 19px;
    border-radius: 4px;
    ${skeleton}
    &::before {
      ${skeletonAnimation}
    }
  `,

  LeaveGroupButton: styled.div`
    ${skeleton}
    &::before {
      ${skeletonAnimation}
    }
    font-size: 12px;
    font-weight: bold;
    width: 125px;
    height: 31px;
    border-radius: 50px;
    position: absolute;
    bottom: 40px;
    left: calc(50% - 125px / 2);
  `,
};
