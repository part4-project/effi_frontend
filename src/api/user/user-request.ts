import axios from '@api/axios';

const userRequest = {
  FetchUserData: async () => {
    try {
      const { data } = await axios.get(`user/info/me`);
      return data;
    } catch (error) {
      return error;
    }
  },
  updateNickname: async (nickName: string) => {
    try {
      const { data } = await axios.post('user/info/modifyNickname', { nickname: nickName });
      return data;
    } catch (error) {
      throw new Error(error as string);
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
