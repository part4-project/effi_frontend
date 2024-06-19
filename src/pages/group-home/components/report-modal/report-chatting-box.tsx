// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import ChattingList from '@components/meeting/chatting-list';
import { CHAT } from '@constants/mockdata';
import styled from 'styled-components';

const ReportChattingBox = () => {
  return (
    <S.Container>
      <S.ChattingLists>
        {CHAT.chat.map((chat) => (
          <ChattingList key={chat.id} nickname={chat.nickname} sentTime={chat.sentTime} chat={chat.chat} />
        ))}
      </S.ChattingLists>
    </S.Container>
  );
};

export default ReportChattingBox;

const S = {
  Container: styled.div`
    grid-area: chat;
    display: flex;
    padding: 15px;
    border: 2px solid ${(props) => props.theme.box};
    border-radius: 10px;
    height: 654px;
    background: ${(props) => props.theme.theme10};
  `,
  ChattingLists: styled.ul`
    display: flex;
    gap: 10px;
    flex-direction: column;
    padding: 20px;
    overflow: auto;
  `,
};
