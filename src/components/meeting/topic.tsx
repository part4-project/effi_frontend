import styled from 'styled-components';
import checkMark from '@/assets/icons/check.svg';

interface TopicProps {
  isCompleted: boolean;
  topicName: string;
  type?: 'report-modal' | 'meeting-room';
  onClick?: () => void;
}

const Topic = ({ isCompleted, topicName, onClick, type = 'report-modal' }: TopicProps) => {
  return (
    <S.TopicList $type={type}>
      <S.TopicInCompleted
        $type={type}
        $isCompleted={isCompleted}
        onClick={type === 'meeting-room' ? onClick : undefined}
      >
        {isCompleted && <S.CheckImg src={checkMark} alt="체크" />}
      </S.TopicInCompleted>
      <S.TopicTitle $type={type}>{topicName}</S.TopicTitle>
    </S.TopicList>
  );
};

export default Topic;

const S = {
  TopicList: styled.li<{ $type: string }>`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 8px;
    margin-right: 8px;
    padding: 4px;
    border-bottom: 2px solid ${({ $type, theme }) => ($type === 'meeting-room' ? '#6F706F' : theme.box)};
  `,
  TopicInCompleted: styled.div<{ $isCompleted: boolean; $type: TopicProps['type'] }>`
    background-color: ${({ $isCompleted, theme }) => ($isCompleted ? theme.text02 : 'none')};
    border: ${({ $isCompleted }) => ($isCompleted ? 'none' : '2px solid var(--gray07)')};
    cursor: ${({ $type }) => ($type === 'meeting-room' ? 'pointer' : 'auto')};
    width: 25px;
    height: 25px;
    border-radius: 100%;
    position: relative;
  `,
  CheckImg: styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
  `,
  TopicTitle: styled.p<{ $type: TopicProps['type'] }>`
    flex-grow: 1;
    color: ${({ $type, theme }) => ($type === 'meeting-room' ? 'var(--gray01)' : theme.text11)};
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.6px;
  `,
};
