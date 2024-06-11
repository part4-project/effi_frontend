import axios from '@api/axios';
import { TUserNicknameReq } from './user-request.type';

const userRequest = {
  updateNickname: async (nameData: TUserNicknameReq) => {
    try {
      const data = await axios.post('user/info/modifyNickname', nameData);
      return data;
    } catch (error) {
      return error;
    }
  },
  updateProfileImg: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const data = await axios.post(`user/info/modifyProfileImage`, formData, {
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
      const data = await axios.post(`user/info/modifyProfileImage/default`);
      return data;
    } catch (error) {
      return error;
    }
  },
} as const;

export default userRequest;
