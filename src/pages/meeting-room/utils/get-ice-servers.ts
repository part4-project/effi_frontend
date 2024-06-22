import axios from '@api/axios';

export const getIceServers = async () => {
  try {
    const { data } = await axios.get(`signal/turn/config`);
    return data;
  } catch (error) {
    return error;
  }
};
