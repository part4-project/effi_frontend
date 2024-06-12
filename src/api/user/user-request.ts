import axios from '@api/axios';

const userRequest = {
  updateNickname: async (nickName: string) => {
    try {
      const { data } = await axios.post('user/info/modifyNickname', { nickname: nickName });
      return data;
    } catch (error) {
      return error;
    }
  },
  updateProfileImg: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await axios.post(`user/info/modifyProfileImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  },
  updateProfileDefaultImg: async () => {
    try {
      const { data } = await axios.post(`user/info/modifyProfileImage/default`);
      return data;
    } catch (error) {
      return error;
    }
  },
} as const;

export default userRequest;
