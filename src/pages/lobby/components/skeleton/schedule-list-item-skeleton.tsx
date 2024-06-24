import { skeleton, skeletonAnimation } from '@styles/skeleton';
import styled from 'styled-components';

const ScheduleListItemSkeleton = () => {
  return (
    <S.BorderBox>
      <S.Container>
        <S.LeftSection>
          <S.GroupItemBox>
            <S.GroupItem />
          </S.GroupItemBox>
          <S.GroupInfo>
            <S.MeetingTitle></S.MeetingTitle>
            <S.GroupName></S.GroupName>
          </S.GroupInfo>
        </S.LeftSection>
      </S.Container>
    </S.BorderBox>
  );
};

export default ScheduleListItemSkeleton;

const S = {
  BorderBox: styled.div`
    padding-bottom: 4px;
    border-bottom: 1px solid ${(props) => props.theme.line};

    &:last-child {
      border-bottom: none;
    }
  `,
  Container: styled.div`
    width: 100%;
    height: 82px;
    padding: 20px 24px;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    background: ${(props) => props.theme.schedule};
    box-shadow: 0px 4px 6.8px 0px ${(props) => props.theme.boxShadow};
    margin-block: 2px;
    color: ${(props) => props.theme.text03};
    border: 1px solid ${(props) => props.theme.schedule};
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      border: 1px solid ${(props) => props.theme.text02};
      transform: translateY(-2px);
    }
  `,
  LeftSection: styled.div`
    display: flex;
    gap: 13px;
    max-width: 70%;
  `,
  GroupItemBox: styled.div`
    min-width: 46px;
  `,
  GroupItem: styled.div`
    width: 46px;
    height: 42px;
    ${skeleton}
    &::before {
      ${skeletonAnimation}
    }
  `,
  GroupInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 50%;
  `,
  MeetingTitle: styled.span`
    width: 150px;
    height: 22px;
    ${skeleton}
    &::before {
      ${skeletonAnimation}
    }
  `,
  GroupName: styled.span`
    width: 150px;
    height: 16px;
    ${skeleton}
    &::before {
      ${skeletonAnimation}
    }
  `,
};
