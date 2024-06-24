import axios from '@api/axios';
import { isAxiosError } from 'axios';

const topicRequest = {
  checkTopic: async (groupId: number, meetingId: number, topicStateList: boolean[]) => {
    try {
      const { data } = await axios.patch(`user/group/${groupId}/meeting/${meetingId}/modify/topic`, { topicStateList });
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          throw {
            errorMessage: error.response.data.errorMessage || 'errorMessage',
            errorCode: error.response.data.errorCode || 'UNKNOWN_ERROR',
            statusCode: error.response.status,
          };
        }
      }
      return error;
    }
  },
} as const;

export default topicRequest;
