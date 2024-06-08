import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
}

export const userStore = create<UserStore>()(
  persist(
    (set) => ({
      isAuth: false,
      login: () => set({ isAuth: true }),
      logout: () => set({ isAuth: false }),
    }),
    {
      name: 'userStore',
    },
  ),
);
