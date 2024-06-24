import axios from '@api/axios';
import { isAxiosError } from 'axios';
import { TMeetingCreateReq } from './meeting-request.type';

const meetingRequest = {
  createMeeting: async (meetingData: TMeetingCreateReq, groupId: number) => {
    try {
      const response = await axios.post(`user/group/${groupId}/meeting/create`, meetingData);
      return response.data;
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
  updateMeeting: async (meetingData: TMeetingCreateReq, groupId: number, meetingId: number | undefined) => {
    try {
      const response = await axios.patch(`user/group/${groupId}/meeting/${meetingId}/modify`, meetingData);
      return response.data;
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
  fetchMeetingList: async (groupId: number) => {
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
  updateMeetingEndDate: async (groupId: number, meetingId: number, actualEndDate: string) => {
    try {
      const { data } = await axios.patch(`user/group/${groupId}/meeting/${meetingId}/end`, { actualEndDate });
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
