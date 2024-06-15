import axios, { isAxiosError } from 'axios';
import { TMeetingCreateReq } from './meeting-request.type';

const meetingRequest = {
  createMeeting: async (meetingData: TMeetingCreateReq, groupId: number) => {
    try {
      const { data } = await axios.post(`user/group/${groupId}/meeting/create`, meetingData);
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

export default meetingRequest;
