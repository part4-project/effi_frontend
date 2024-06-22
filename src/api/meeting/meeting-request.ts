import axios from '@api/axios';
import { isAxiosError } from 'axios';
import { TMeetingCreateReq } from './meeting-request.type';

const meetingRequest = {
  createMeeting: async (meetingData: TMeetingCreateReq, groupId: number) => {
    try {
      const response = await axios.post(`user/group/${groupId}/meeting/create`, meetingData);
      if (response.status == 200) {
        return response.data;
      } else {
        throw response;
      }
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
  fetchMeeting: async (groupId: number) => {
    try {
      const { data } = await axios.get(`user/group/${groupId}/meeting/view/available`);
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
