import axios from '@api/axios';
import { isAxiosError } from 'axios';

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
  updateProfileDefaultImg: async () => {
    try {
      const { data } = await axios.post(`user/info/modifyProfileImage/default`);
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

export default userRequest;
