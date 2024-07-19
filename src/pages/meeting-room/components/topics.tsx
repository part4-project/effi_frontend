/* eslint-disable no-console */
import { TReportTopic } from '@api/report/report-request.type';
import Topic from '@components/meeting/topic';
import { useMeetingQuery } from '@hooks/react-query/use-query-meeting';
import { useTopicCheckMutation } from '@hooks/react-query/use-query-topic';
import useTopicSocket from '@hooks/socket/use-topic-socket';
import { useGroupStore } from '@stores/group';
import styled from 'styled-components';

interface TTopics {
  roomId: number;
}
const Topics = ({ roomId }: TTopics) => {
  const { data: meetingData, isLoading, isError, refetch } = useMeetingQuery(roomId);
  const { mutate } = useTopicCheckMutation(
    useGroupStore((state) => state.groupId),
    meetingData?.id,
  );
  useTopicSocket(roomId, refetch);

  if (isLoading) return 'Loading...';
  if (isError) return 'Error...';

  const { topicList } = meetingData;
  topicList.sort((a: TReportTopic, b: TReportTopic) => a.orderIndex - b.orderIndex);

  const handleCheckClick = (orderIndex: number) => {
    const topicStateList = topicList.map((topic: TReportTopic) =>
      topic.orderIndex == orderIndex ? !topic.isCompleted : topic.isCompleted,
    );

    mutate(topicStateList);
  };

  return (
    <S.Container>
      <S.TopicAgenda>회의 안건</S.TopicAgenda>
      <S.TopicContainer>
        {meetingData.topicList.map((topic: TReportTopic) => (
          <Topic
            key={topic.orderIndex}
            isCompleted={topic.isCompleted}
            topicName={topic.topicName}
            type="meeting-room"
            onClick={() => handleCheckClick(topic.orderIndex)}
          />
        ))}
      </S.TopicContainer>
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
