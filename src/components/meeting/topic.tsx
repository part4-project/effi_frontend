import styled from 'styled-components';
import ModifyDeleteButton from './modify-delete-button';
import checkMark from '@/assets/icons/check.svg';

interface TopicProps {
  isCompleted: boolean;
  topicName: string;
  type?: 'report-modal' | 'meeting-room';
  onClick?: () => void;
}

const Topic = ({ isCompleted, topicName, type = 'report-modal', onClick }: TopicProps) => {
  return (
    <S.TopicList $type={type}>
      <S.TopicInCompleted
        $type={type}
        $isCompleted={isCompleted}
        onClick={type === 'meeting-room' ? onClick : undefined}
      >
        {isCompleted && <img src={checkMark} alt="체크" />}
      </S.TopicInCompleted>
      <S.TopicTitle $type={type}>{topicName}</S.TopicTitle>
      <ModifyDeleteButton />
    </S.TopicList>
  );
};

export default Topic;

const S = {
  TopicAgenda: styled.p<{ $type: string }>`
    background: ${({ $type }) => ($type === 'meeting-room' ? '#4D4F4E' : 'var(--white)')};
    color: ${({ $type }) => ($type === 'meeting-room' ? '#9d9d9d' : '#A6A6A6')};
    font-size: 20px;
    font-weight: 900;
    line-height: 35px;
    border-bottom: 1px solid ${({ $type }) => ($type === 'meeting-room' ? '#6F706F' : '#f3f3f3')};
    padding-bottom: 10px;
  `,
  TopicList: styled.li<{ $type: string }>`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 8px;
    margin-right: 8px;
    padding: 4px;
    border-bottom: 2px solid ${({ $type }) => ($type === 'meeting-room' ? '#6F706F' : '#f3f3f3')};
  `,
  TopicInCompleted: styled.div<{ $isCompleted: boolean; $type: string }>`
    background-color: ${({ $isCompleted }) => ($isCompleted ? '#3e82f1' : 'none')};
    border: ${({ $isCompleted }) => ($isCompleted ? 'none' : '2px solid #c5c5c5')};
    cursor: ${({ $type }) => ($type === 'meeting-room' ? 'pointer' : 'auto')};
    width: 25px;
    height: 25px;
    border-radius: 100%;
    position: relative;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 16px;
      height: 16px;
    }
  `,
  TopicTitle: styled.p<{ $type: string }>`
    flex-grow: 1;
    color: ${({ $type }) => ($type === 'meeting-room' ? '#9E9E9E' : '#091a37')};
    font-size: 16px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.6px;
  `,
};
