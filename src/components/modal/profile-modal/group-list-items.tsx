/* eslint-disable no-unused-vars */
import { TInvitedGroupFetchRes } from '@api/group/group-request.type';
import EmptyNotice from '@components/empty-notice';
import styled, { css, useTheme } from 'styled-components';
import InvitedGroupListSkeleton from './invited-group-list-skeleton';

interface GroupListItemsProps {
  isLoading: boolean;
  invitedGroupList?: TInvitedGroupFetchRes[];
  onAcceptButtonClick: (groupId: number) => void;
  onRejectButtonClick: (groupId: number) => void;
}

const GroupListItems = ({
  isLoading,
  invitedGroupList,
  onAcceptButtonClick,
  onRejectButtonClick,
}: GroupListItemsProps) => {
  const theme = useTheme();

  if (isLoading) return new Array(3).fill(1).map((_, i) => <InvitedGroupListSkeleton key={i} />);

  if (!invitedGroupList?.length)
    return (
      <S.EmptyNoticeContainer>
        <EmptyNotice>초대받은 그룹이 없습니다!</EmptyNotice>
      </S.EmptyNoticeContainer>
    );

  return invitedGroupList.map((group) => (
    <S.InvitedGroup key={group.groupId}>
      <S.Inviter>{`${group.invitorName}님이\n초대를 보냈습니다.`}</S.Inviter>
      <S.GroupInfo>
        <S.GroupName>{group.groupName}</S.GroupName>
        <S.GroupCode>#{group.code}</S.GroupCode>
      </S.GroupInfo>

      <S.InvitedGroupButtons>
        <div onClick={() => onAcceptButtonClick(group.groupId)}>
          <S.AcceptButton src={theme.check} alt="Accepted" />
        </div>
        <div onClick={() => onRejectButtonClick(group.groupId)}>
          <S.RejectButton src={theme.reject} alt="Reject" />
        </div>
      </S.InvitedGroupButtons>
    </S.InvitedGroup>
  ));
};

export default GroupListItems;

const BaseButton = css`
  width: 30px;
  cursor: pointer;
`;

const S = {
  InvitedGroup: styled.li`
    background: ${(props) => props.theme.text01};
    border: 2px solid ${(props) => props.theme.line};
    padding: 10px;
    border-radius: 10px;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: var(--dark08);
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
      border: 2px solid ${(props) => props.theme.hoverLine};
      transform: translateY(-4px);
      p {
        color: ${(props) => props.theme.theme01};
      }
      strong {
        color: ${(props) => props.theme.text12};
      }
      span {
        color: ${(props) => props.theme.text13};
      }
    }
  `,

  Inviter: styled.p`
    white-space: pre-line;
    font-size: 12px;
    color: ${(props) => props.theme.text02};
    margin-bottom: 10px;
  `,

  GroupInfo: styled.div`
    border: 1px solid ${(props) => props.theme.line};
    border-radius: 5px;
    min-width: 110px;
    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 14px;
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

  AcceptButton: styled.img`
    ${BaseButton}
  `,
  RejectButton: styled.img`
    ${BaseButton}
  `,
  EmptyNoticeContainer: styled.div`
    width: 100%;
    height: 143px;
  `,
};
