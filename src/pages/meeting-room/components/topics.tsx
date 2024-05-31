import styled from 'styled-components';

type TopicListType = {
  id: number;
  topic_name: string;
  is_completed: boolean;
};

interface TopicsProps {
  topicList: TopicListType[];
}

const Topics = ({ topicList }: TopicsProps) => {
  return (
    <S.Container>
      {topicList.map((topic) => (
        <S.TopicItem key={topic.id}>
          <input type="checkbox" id={topic.topic_name} name={topic.topic_name} defaultChecked={topic.is_completed} />
          <label htmlFor={topic.topic_name}>{topic.topic_name}</label>
        </S.TopicItem>
      ))}
    </S.Container>
  );
};

export default Topics;

const S = {
  Container: styled.div`
    width: 100%;
    height: 341px;
    border-radius: 10px;
    background: #fafafa;
    box-shadow: 0px 4px 15.7px 0px rgba(0, 0, 0, 0.25);
  `,
  TopicItem: styled.div`
    display: flex;
    align-items: center;
    margin: 16px;
    input {
      margin-right: 8px;
    }
  `,
};
