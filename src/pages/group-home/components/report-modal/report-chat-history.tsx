import { CHAT } from '@constants/mockdata';
import styled from 'styled-components';

const ReportChatHistory = () => {
  return (
    <>
      <p>채팅 내역</p>
      <S.ChattingLists>
        {CHAT.chat.map((chat) => (
          <S.ChattingList key={chat.id}>
            <S.ChattingUser>{chat.nickname}</S.ChattingUser>
            <S.ChattingData>{chat.chat}</S.ChattingData>
          </S.ChattingList>
        ))}
      </S.ChattingLists>
    </>
  );
};

export default ReportChatHistory;

const S = {
  //height 지정 필요 (스크롤)
  ChattingLists: styled.ul`
    display: flex;
    gap: 10px;
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    padding: 10px;
    overflow-y: auto;
    width: 100%;
  `,

  ChattingList: styled.li``,

  ChattingUser: styled.strong``,

  ChattingData: styled.p``,
};
