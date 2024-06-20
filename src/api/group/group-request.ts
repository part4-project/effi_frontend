import axios from '@api/axios';
import { isAxiosError } from 'axios';

const groupRequest = {
  fetchGroup: async () => {
    try {
      const { data } = await axios.get(`user/group/view/myList`);
      return data;
    } catch (error) {
      return error;
    }
  },
  fetchGroupMember: async (groupId: number) => {
    try {
      const { data } = await axios.get(`user/group/view/${groupId}/members`);
      return data;
    } catch (error) {
      return error;
    }
  },
  createGroup: async (groupData: string) => {
    try {
      const { data } = await axios.post('user/group/create', { groupName: groupData });
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
  updateGroup: async (groupName: string, groupId: number) => {
    try {
      const { data } = await axios.patch(`user/group/modify/${groupId}`, { groupName });
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
  inviteGroup: async (targetEmail: string, groupId: number) => {
    try {
      const response = await axios.post(`user/group/invite`, { groupId, targetEmail });
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
  fetchInvitedGroup: async () => {
    try {
      const { data } = await axios.get(`user/group/view/invitations`);
      return data;
    } catch (error) {
      return error;
    }
  },
  acceptInvitedGroup: async (groupId: number) => {
    try {
      const { data } = await axios.post(`user/group/invitation/accept`, { groupId });
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
  rejectInvitedGroup: async (groupId: number) => {
    try {
      await axios.delete(`user/group/invitation/reject`, { data: { groupId } });
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
  exileGroupMember: async (groupId: number, groupMemberIdList: number[]) => {
    try {
      await axios.delete(`user/group/exile/${groupId}`, { data: { groupMemberIds: groupMemberIdList } });
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
  withdrawGroup: async (groupId: number) => {
    try {
      const response = await axios.delete(`user/group/withdraw/${groupId}`);
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
} as const;

export default groupRequest;
