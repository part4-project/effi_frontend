import { TOPIC } from '@constants/mockdata';
import styled from 'styled-components';

const ReportTopic = () => {
  return (
    <>
      <p>회의 주제</p>
      <S.TopicLists>
        {TOPIC.topic_list.map((topic) => (
          <S.TopicList key={topic.id}>
            <S.TopicTitle>{topic.topic_name}</S.TopicTitle>
            {topic.is_completed ? <S.TopicComplete>O</S.TopicComplete> : <S.TopicComplete>X</S.TopicComplete>}
          </S.TopicList>
        ))}
      </S.TopicLists>
    </>
  );
};

export default ReportTopic;

const S = {
  TopicLists: styled.ul`
    display: flex;
    gap: 4px;
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    padding: 10px;
    width: 100%;
  `,

  TopicList: styled.li`
    display: flex;
    gap: 10px;
    margin-top: 8px;
    padding: 4px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    background-color: #c86974;
  `,

  TopicTitle: styled.strong``,

  TopicComplete: styled.p``,
};
