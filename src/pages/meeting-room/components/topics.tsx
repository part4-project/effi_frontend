/* eslint-disable no-console */
import { useState } from 'react';
import Topic from '@components/meeting/topic';
import styled from 'styled-components';
import InputForm from './input-form';
import useInputForm from '../hooks/use-input-form';

type TopicListType = {
  id: number;
  topic_name: string;
  is_completed: boolean;
};

interface TopicsProps {
  topicList: TopicListType[];
}

const Topics = ({ topicList }: TopicsProps) => {
  const [meetingRoomTopicList, setMeetingRoomTopicList] = useState(topicList);
  const { inputValue, handleSubmit, handleInputValueChange } = useInputForm(() => console.log('submitCb실행'));

  const handleCheckClick = (id: number) => {
    setMeetingRoomTopicList((prev: TopicListType[]) =>
      prev.map((topic: TopicListType) => (topic.id === id ? { ...topic, is_completed: !topic.is_completed } : topic)),
    );
  };

  return (
    <S.Container>
      <S.TopicAgenda>회의 안건</S.TopicAgenda>
      <S.TopicContainer>
        {meetingRoomTopicList.map((topic) => (
          <Topic
            key={topic.id}
            isCompleted={topic.is_completed}
            topicName={topic.topic_name}
            type="meeting-room"
            onClick={() => handleCheckClick(topic.id)}
          />
        ))}
      </S.TopicContainer>
      <InputForm type="topic" inputValue={inputValue} onSubmit={handleSubmit} onChange={handleInputValueChange} />
    </S.Container>
  );
};

export default Topics;

const S = {
  Container: styled.div`
    height: 40%;
    border-radius: 10px;
    background: #4d4f4e;
    box-shadow: 0px 4px 15.7px 0px rgba(0, 0, 0, 0.25);
    padding: 20px 15px 0 15px;
  `,
  TopicAgenda: styled.p`
    height: 15%;
    background: #4d4f4e;
    color: #9d9d9d;
    font-size: 20px;
    font-weight: 900;
    line-height: 35px;
    padding-bottom: 10px;
  `,
  TopicContainer: styled.ul`
    height: 60%;
    display: flex;
    gap: 4px;
    flex-direction: column;
    overflow: auto;
    &::-webkit-scrollbar {
      display: block;
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--gray03);
    }

    &::-webkit-scrollbar-track {
      background: #9d9d9d;
    }
  `,
};
