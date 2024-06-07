import { TOPIC } from '@constants/mockdata';
import styled from 'styled-components';
import checkMark from '@/assets/icons/check.svg';
import circleBlue1 from '@/assets/icons/circle-blue1.svg';
import circleGray from '@/assets/icons/circle-gray.svg';

interface TopicListProps {
  theme?: string;
}

const TopicList = ({ theme = 'white' }: TopicListProps) => {
  return (
    <S.Container $theme={theme}>
      <S.TopicAgenda $theme={theme}>회의 안건</S.TopicAgenda>
      <S.TopicLists $theme={theme}>
        {TOPIC.topic_list.map((topic) => (
          <S.TopicList key={topic.id} $theme={theme}>
            {topic.is_completed ? (
              <S.TopicCompleted>
                <S.TopicCompletedCircleIcon src={circleBlue1} />
                <S.TopicCompletedCheckIcon src={checkMark} />
              </S.TopicCompleted>
            ) : (
              <S.TopicInCompleted src={circleGray} />
            )}
            <S.TopicTitle $theme={theme}>{topic.topic_name}</S.TopicTitle>
          </S.TopicList>
        ))}
      </S.TopicLists>
    </S.Container>
  );
};

export default TopicList;

const S = {
  Container: styled.div<{ $theme: string }>`
    grid-area: topic;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 2px solid ${({ $theme }) => ($theme === 'dark' ? '#4D4F4E' : 'var(--gray03)')};
    height: 255px;
    padding: 15px 10px 10px 15px;
    background: ${({ $theme }) => ($theme === 'dark' ? '#4D4F4E' : 'var(--white)')};
  `,

  TopicAgenda: styled.p<{ $theme: string }>`
    background: ${({ $theme }) => ($theme === 'dark' ? '#4D4F4E' : 'var(--white)')};
    color: ${({ $theme }) => ($theme === 'dark' ? '#9d9d9d' : '#A6A6A6')};
    font-size: 20px;
    font-weight: 900;
    line-height: 35px;
    border-bottom: 1px solid ${({ $theme }) => ($theme === 'dark' ? '#6F706F' : 'var(--gray03)')};
    padding-bottom: 10px;
  `,

  TopicLists: styled.ul<{ $theme: string }>`
    display: flex;
    gap: 4px;
    flex-direction: column;
    padding: 10px;
    width: 100%;
    overflow: auto;

    &::-webkit-scrollbar-thumb {
      background: ${({ $theme }) => ($theme === 'dark' ? 'var(--gray03)' : '#D6D6D7')};
    }

    &::-webkit-scrollbar-track {
      background: ${({ $theme }) => ($theme === 'dark' ? '#9d9d9d' : 'var(--gray03)')};
    }
  `,

  TopicList: styled.li<{ $theme: string }>`
    display: flex;
    gap: 10px;
    margin-top: 8px;
    padding: 4px;
    border-bottom: 2px solid ${({ $theme }) => ($theme === 'dark' ? '#6F706F' : 'var(--gray03)')};
  `,

  TopicCompleted: styled.span`
    position: relative;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  TopicCompletedCircleIcon: styled.img`
    width: 25px;
    height: 25px;
  `,
  TopicCompletedCheckIcon: styled.img`
    position: absolute;
    width: 16px;
    height: 16px;
  `,

  TopicInCompleted: styled.img`
    width: 25px;
    height: 25px;
  `,

  TopicTitle: styled.p<{ $theme: string }>`
    width: 100%;
    color: ${({ $theme }) => ($theme === 'dark' ? 'var(--gray01)' : '#091a37')};
    font-size: 16px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.6px;
  `,
};
