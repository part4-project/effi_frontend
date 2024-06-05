import { getCookie } from '@utils/cookie';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserData = {
  email: string;
} | null;

interface UserStore {
  auth: boolean;
  userData: UserData;
  setAuth: (token: boolean) => void;
  setUserData: (data: UserData) => void;
  logout: () => void;
}

export const userStore = create<UserStore>()(
  persist(
    (set) => ({
      auth: false,
      userData: null,
      setAuth: (isAuth) => set({ auth: isAuth }),
      setUserData: (data) => set({ userData: data }),
      logout: () => set({ auth: false, userData: null }),
    }),
    {
      name: 'userStore',
    },
  ),
);
