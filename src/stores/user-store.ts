import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface userData {
  email: string;
}

export const userStore = create(
  persist(
    (set) => ({
      userData: 'test',
      setUserData: (data: userData) => set({ userData: data }),
    }),
    {
      name: 'userStore',
    },
  ),
);
