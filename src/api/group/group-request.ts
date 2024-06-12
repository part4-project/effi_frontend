import axios from '@api/axios';

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
      return error;
    }
  },
  updateGroup: async (groupName: string, groupId: string) => {
    try {
      const { data } = await axios.patch(`user/group/modify/${groupId}`, { groupName });
      return data;
    } catch (error) {
      return error;
    }
  },
} as const;

export default groupRequest;
