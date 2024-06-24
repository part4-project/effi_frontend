import axios from '@api/axios';
import { isAxiosError } from 'axios';

const alarmRequest = {
  fetchAlarm: async () => {
    try {
      const { data } = await axios.get(`user/alarm/view`);
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
  deleteAlarm: async (alarmId: string) => {
    try {
      await axios.delete(`user/alarm/delete?alarmId=${alarmId}`);
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

export default alarmRequest;
