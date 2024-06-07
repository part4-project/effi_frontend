import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserData = {
  email: string;
} | null;

interface UserStore {
  auth: boolean;
  userData: UserData;
  // eslint-disable-next-line no-unused-vars
  login: (data: UserData) => void;
  logout: () => void;
}

export const userStore = create<UserStore>()(
  persist(
    (set) => ({
      auth: false,
      userData: null,
      login: (data) => set({ auth: true, userData: data }),
      logout: () => set({ auth: false, userData: null }),
    }),
    {
      name: 'userStore',
    },
  ),
);
