import { TReportTopic } from '@api/report/report-request.type';
import Topic from '@components/meeting/topic';
import styled from 'styled-components';
interface TReportTopicList {
  topicList: TReportTopic[];
}
const ReportTopicList = ({ topicList }: TReportTopicList) => {
  topicList.sort((a, b) => a.orderIndex - b.orderIndex);
  return (
    <S.Container>
      <S.TopicAgenda>회의 안건</S.TopicAgenda>
      <S.TopicLists>
        {topicList.map((topic: TReportTopic, idx) => (
          <Topic key={idx} isCompleted={topic.isCompleted} topicName={topic.topicName} />
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
    border: 2px solid ${(props) => props.theme.box};
    height: 255px;
    padding: 15px 10px 10px 15px;
    background: ${(props) => props.theme.theme10};
  `,

  TopicAgenda: styled.p`
    background: ${(props) => props.theme.theme10};
    color: var(--gray05);
    font-size: 20px;
    font-weight: 900;
    line-height: 35px;
    border-bottom: 1px solid ${(props) => props.theme.box};
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
