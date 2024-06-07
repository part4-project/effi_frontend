import { CHAT } from '@constants/mockdata';
import { formatHoursAmPm } from '@pages/group-home/utils/format-hours-ampm';
import styled from 'styled-components';
import testProfile from '@/assets/profile-test-img.gif';

interface ChattingBoxProps {
  theme?: string;
}

const ChattingBox = ({ theme = 'white' }: ChattingBoxProps) => {
  return (
    <S.Container $theme={theme}>
      <S.ChattingLists $theme={theme}>
        {CHAT.chat.map((chat) => (
          <S.ChattingList key={chat.id}>
            <S.ChattingIcon src={testProfile} />
            <S.ChattingBox>
              <S.ChattingUserName>{chat.nickname}</S.ChattingUserName>
              <S.ChattingLog $theme={theme}>{chat.chat}</S.ChattingLog>
            </S.ChattingBox>
            <S.ChattingSentTime>{formatHoursAmPm(chat.sentTime)}</S.ChattingSentTime>
          </S.ChattingList>
        ))}
      </S.ChattingLists>
    </S.Container>
  );
};

export default ChattingBox;

const S = {
  Container: styled.div<{ $theme: string }>`
    grid-area: chat;
    display: flex;
    padding: 15px;
    border: 2px solid ${({ $theme }) => ($theme === 'dark' ? '#4D4F4E' : 'var(--gray03)')};
    border-radius: 10px;
    height: 654px;
    background: ${({ $theme }) => ($theme === 'dark' ? '#4D4F4E' : 'var(--white)')};
  `,
  ChattingLists: styled.ul<{ $theme: string }>`
    display: flex;
    gap: 10px;
    flex-direction: column;
    padding: 20px;
    overflow: auto;
    width: 100%;

    &::-webkit-scrollbar-thumb {
      background: ${({ $theme }) => ($theme === 'dark' ? 'var(--gray03)' : '#D6D6D7')};
    }

    &::-webkit-scrollbar-track {
      background: ${({ $theme }) => ($theme === 'dark' ? '#9d9d9d' : 'var(--gray03)')};
    }
  `,

  ChattingList: styled.li`
    display: flex;
  `,

  ChattingIcon: styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
  `,

  ChattingBox: styled.div`
    margin: 8px 5px 0 8px;
    max-width: 70%;
  `,

  ChattingUserName: styled.p`
    color: var(--gray01);
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.6px;
  `,

  ChattingLog: styled.p<{ $theme: string }>`
    border-radius: 16px;
    background: ${({ $theme }) => ($theme === 'dark' ? '#404040' : 'var(--blue01)')};
    padding: 6px 20px;

    color: var(--white);
    line-height: 28px;
    letter-spacing: -0.6px;
  `,
  ChattingSentTime: styled.p`
    display: flex;
    align-items: end;
    color: var(--gray01);
    font-size: 12px;
    letter-spacing: -0.6px;
  `,
};
