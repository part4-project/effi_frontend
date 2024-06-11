import axios from '@api/axios';

const groupRequest = {
  fetchGroup: async () => {
    try {
      const data = await axios.get(`user/group/view/myList`);
      return data;
    } catch (error) {
      return error;
    }
  },
  fetchGroupMember: async (groupId: number) => {
    try {
      const data = await axios.get(`user/group/view/${groupId}/members`);
      return data;
    } catch (error) {
      return error;
    }
  },
  createGroup: async (groupData: string) => {
    try {
      const data = await axios.post('user/group/create', { groupData });
      return data;
    } catch (error) {
      return error;
    }
  },
  updateGroup: async (groupData: string, groupId: string) => {
    try {
      const data = await axios.patch(`user/group/modify/${groupId}`, { groupData });
      return data;
    } catch (error) {
      return error;
    }
  },
} as const;

export default groupRequest;
