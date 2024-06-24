import { formatHoursAmPm } from '@pages/group-home/utils/format-hours-ampm';
import styled, { css } from 'styled-components';

interface TReportChatting {
  message: string;
  nickName: string;
  profileImageUrl: string;
  roomId: number;
  timeStamp: string;
  userId: number;
  isMe: boolean;
}
const ReportChattingList = ({ timeStamp, profileImageUrl, nickName, message, isMe }: TReportChatting) => {
  return (
    <S.ChattingList $isMe={isMe}>
      <S.ChattingIcon src={profileImageUrl} alt="profile" />
      <S.ChattingBox>
        <S.ChattingUserName $isMe={isMe}>{nickName}</S.ChattingUserName>
        <S.ChattingLog>{message}</S.ChattingLog>
      </S.ChattingBox>
      <S.ChattingSentTime>{formatHoursAmPm(timeStamp)}</S.ChattingSentTime>
    </S.ChattingList>
  );
};
export default ReportChattingList;

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
    background: ${({ theme }) => theme.theme01};
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
