import Topic from '@components/meeting/topic';
import { TOPIC } from '@constants/mockdata';
import styled from 'styled-components';

const ReportTopicList = () => {
  return (
    <S.Container>
      <S.TopicAgenda>회의 안건</S.TopicAgenda>
      <S.TopicLists>
        {TOPIC.topic_list.map((topic) => (
          <Topic key={topic.id} isCompleted={topic.is_completed} topicName={topic.topic_name} />
        ))}
      </S.TopicLists>
    </S.Container>
  );
};

export default ReportTopicList;

const S = {
  Container: styled.div`
    grid-area: topic;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 2px solid var(--gray03);
    height: 255px;
    padding: 15px 10px 10px 15px;
    background: var(--white);
  `,

  TopicAgenda: styled.p`
    background: var(--white);
    color: #a6a6a6;
    font-size: 20px;
    font-weight: 900;
    line-height: 35px;
    border-bottom: 1px solid var(--gray03);
    padding-bottom: 10px;
  `,

  TopicLists: styled.ul`
    display: flex;
    gap: 4px;
    flex-direction: column;
    padding: 10px;
    width: 100%;
    overflow: auto;
  `,
};
