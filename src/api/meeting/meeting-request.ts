import axios from 'axios';
import { TMeetingCreateReq } from './meeting-request.type';

const meetingRequest = {
  createMeeting: async (meetingData: TMeetingCreateReq, groupId: number) => {
    try {
      const { data } = await axios.post(`user/group/${groupId}/meeting/create`, meetingData);
      return data;
    } catch (error) {
      return error;
    }
  },
} as const;

export default meetingRequest;
