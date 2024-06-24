import { useState, useLayoutEffect } from 'react';
import { formatHoursAmPm } from '@pages/group-home/utils/format-hours-ampm';
import { TChatType, TChatSocketType } from '@pages/meeting-room/types';
import styled, { css } from 'styled-components';
import UserHOC from '../../../components/meeting/user-hoc';

interface ChatProps {
  chat: TChatType;
  prevChat?: TChatType | null;
  isMe: boolean;
  currentIndex: number;
  chatSocketList: TChatSocketType[];
}

const ChattingList = ({ chat, prevChat, currentIndex, chatSocketList, isMe }: ChatProps) => {
  const [isCurrentUserChatting, setIsCurrentUserChatting] = useState({
    sameUser: false,
    sameTime: false,
    sameType: false,
  });
  const [isCurrentUserTime, setIsCurrentUserTime] = useState(true);
  const isSameUserChatting = Object.values(isCurrentUserChatting).every((same) => same === true);

  useLayoutEffect(() => {
    if (chatSocketList.length <= currentIndex + 2) {
      if (prevChat && chat.userId === prevChat.userId) {
        setIsCurrentUserChatting((prev) => ({ ...prev, sameUser: true }));
      }

      if (prevChat && chat.timeStamp.split('.')[0].slice(0, -2) === prevChat.timeStamp.split('.')[0].slice(0, -2)) {
        setIsCurrentUserChatting((prev) => ({ ...prev, sameTime: true }));
      }

      if (prevChat && chat.type === prevChat.type) {
        setIsCurrentUserChatting((prev) => ({ ...prev, sameType: true }));
      }

      if (
        chatSocketList[currentIndex + 1] &&
        chatSocketList[currentIndex + 1].userId === chat.userId &&
        chatSocketList[currentIndex + 1].type === chat.type &&
        chatSocketList[currentIndex + 1].timeStamp.split('.')[0].slice(0, -2) ===
          chat.timeStamp.split('.')[0].slice(0, -2)
      ) {
        setIsCurrentUserTime(false);
      }
    }
  }, [chatSocketList]);

  if (chat.type != 'CHAT') {
    return (
      <S.ChattingSystemLog>
        <p>{chat.message}</p>
      </S.ChattingSystemLog>
    );
  }

  return (
    <S.ChattingList $isMe={isMe}>
      {!isSameUserChatting ? (
        <S.ChattingIcon $isMe={isMe} src={chat.profileImageUrl} alt="profile" />
      ) : (
        <S.ChattingNoneIcon $isMe={isMe} />
      )}
      <S.ChattingBox $isSameUser={isCurrentUserChatting.sameUser}>
        {!isSameUserChatting && <S.ChattingUserName $isMe={isMe}>{chat.nickname}</S.ChattingUserName>}
        <S.ChattingLog>{chat.message}</S.ChattingLog>
      </S.ChattingBox>
      {isCurrentUserTime && <S.ChattingSentTime>{formatHoursAmPm(chat.timeStamp)}</S.ChattingSentTime>}
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
  ChattingIcon: styled.img<{ $isMe: boolean }>`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    ${({ $isMe }) =>
      $isMe &&
      css`
        display: none;
      `}
  `,
  ChattingNoneIcon: styled.div<{ $isMe: boolean }>`
    width: 40px;
    height: 40px;
    ${({ $isMe }) =>
      $isMe &&
      css`
        display: none;
      `}
  `,
  ChattingBox: styled.div<{ $isSameUser: boolean }>`
    margin: 8px 5px 0 8px;
    max-width: 70%;
    flex: 0 0 auto;
    ${({ $isSameUser }) =>
      $isSameUser &&
      css`
        margin: 0px 5px 0 8px;
      `}
  `,
  ChattingUserName: styled.p<{ $isMe: boolean }>`
    color: var(--gray01);
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.6px;
    ${({ $isMe }) =>
      $isMe &&
      css`
        display: none;
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
