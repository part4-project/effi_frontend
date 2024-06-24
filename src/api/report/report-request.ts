import axios from '@api/axios';
import { isAxiosError } from 'axios';

const reportRequest = {
  fetchReportList: async (groupId: number, startDate: string, endDate: string) => {
    try {
      const { data } = await axios.get(`report/meeting/${groupId}`, {
        params: {
          startDate,
          endDate,
        },
      });
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
  fetchReport: async (groupId: number, meetingId: number) => {
    try {
      const { data } = await axios.get(`report/meeting/${groupId}/${meetingId}`);
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

export default reportRequest;
