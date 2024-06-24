import { formatHoursAmPm } from '@pages/group-home/utils/format-hours-ampm';
import { TChatType } from '@pages/meeting-room/types';
import styled, { css } from 'styled-components';
import UserHOC from '../../../components/meeting/user-hoc';

interface ChatProps {
  chat: TChatType;
  isMe: boolean;
}

const ChattingList = ({ chat, isMe }: ChatProps) => {
  if (chat.type != 'CHAT') {
    return (
      <S.ChattingSystemLog>
        <p>{chat.message}</p>
      </S.ChattingSystemLog>
    );
  }
  return (
    <S.ChattingList $isMe={isMe}>
      <S.ChattingIcon src={chat.profileImageUrl} alt="profile" />
      <S.ChattingBox>
        <S.ChattingUserName $isMe={isMe}>{chat.nickname}</S.ChattingUserName>
        <S.ChattingLog>{chat.message}</S.ChattingLog>
      </S.ChattingBox>
      <S.ChattingSentTime>{formatHoursAmPm(chat.timeStamp)}</S.ChattingSentTime>
    </S.ChattingList>
  );
};
export default UserHOC(ChattingList);

const S = {
  ChattingList: styled.li<{ $isMe: boolean }>`
    display: flex;
    ${({ $isMe }) =>
      $isMe &&
      css`
        flex-direction: row-reverse;
      `}
  `,
  ChattingIcon: styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
  `,
  ChattingBox: styled.div`
    margin: 8px 5px 0 8px;
    max-width: 70%;
    flex: 0 0 auto;
  `,
  ChattingUserName: styled.p<{ $isMe: boolean }>`
    color: var(--gray01);
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.6px;
    ${({ $isMe }) =>
      $isMe &&
      css`
        text-align: right;
      `}
  `,
  ChattingLog: styled.p`
    border-radius: 16px;
    background: var(--gray06);
    padding: 6px 20px;
    color: var(--white);
    line-height: 28px;
    letter-spacing: -0.6px;
    word-break: break-all;
  `,
  ChattingSentTime: styled.p`
    display: flex;
    align-items: end;
    color: var(--gray01);
    font-size: 12px;
    letter-spacing: -0.6px;
  `,
  ChattingSystemLog: styled.li`
    color: var(--gray01);
    text-align: center;
  `,
};
