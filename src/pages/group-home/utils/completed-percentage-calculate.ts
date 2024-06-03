import { TNoteItem } from '@constants/mockdata.type';

export const calculateCompletedPercentage = (data: TNoteItem) => {
  const completedTopics = data.topic_list.filter((topic) => topic.is_completed);
  const percentage = (completedTopics.length / data.topic_list.length) * 100;
  return percentage.toFixed(0);
};
