import { TReportTopic } from '@api/report/report-request.type';

export const calculateCompletedPercentage = (topicList: TReportTopic[]) => {
  if (topicList.length === 0) {
    return 0;
  } else {
    const completedTopics = topicList.filter((topic) => topic.isCompleted);
    const percentage = (completedTopics.length / topicList.length) * 100;
    return percentage.toFixed(0);
  }
};
