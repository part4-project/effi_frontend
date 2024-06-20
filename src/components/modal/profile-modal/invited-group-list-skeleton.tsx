import { skeleton, skeletonAnimation } from '@styles/skeleton';
import styled from 'styled-components';

const InvitedGroupListSkeleton = () => {
  return (
    <S.InvitedGroup>
      <S.Inviter></S.Inviter>
      <S.GroupInfo>
        <S.GroupName></S.GroupName>
        <S.GroupCode></S.GroupCode>
      </S.GroupInfo>
      <S.InvitedGroupButtons>
        <S.Button />
        <S.Button />
      </S.InvitedGroupButtons>
    </S.InvitedGroup>
  );
};

export default InvitedGroupListSkeleton;

const S = {
  InvitedGroup: styled.li`
    background: ${(props) => props.theme.text01};
    border: 2px solid ${(props) => props.theme.line};
    padding: 10px;
    border-radius: 10px;
    height: 143px;
  `,

  Inviter: styled.p`
    white-space: pre-line;
    font-size: 12px;
    color: ${(props) => props.theme.text02};
    margin-bottom: 10px;
    height: 28px;
    ${skeleton}
    &::before {
      ${skeletonAnimation}
    }
  `,

  GroupInfo: styled.div`
    border-radius: 5px;
    min-width: 110px;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 14px;
    height: 35px;
    ${skeleton}
    &::before {
      ${skeletonAnimation}
    }
  `,

  GroupName: styled.strong`
    color: ${(props) => props.theme.text06};
    font-weight: 700;
    margin-right: 5px;
  `,

  GroupCode: styled.span`
    color: var(--gray01);
    font-weight: 700;
    font-size: 12px;
  `,

  InvitedGroupButtons: styled.div`
    display: flex;
    justify-content: end;
    padding-right: 8px;
    gap: 23px;
  `,

  Button: styled.div`
    width: 30px;
    height: 30px;
    border-radius: 100%;
    ${skeleton}
    &::before {
      ${skeletonAnimation}
    }
  `,

  EmptyNoticeContainer: styled.div`
    width: 100%;
    height: 143px;
  `,
};
