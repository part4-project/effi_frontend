import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DarkModeStoreTypes {
  isDarkMode: boolean;
  onDarkMode: () => void;
  onLightMode: () => void;
}

export const darkModeStore = create<DarkModeStoreTypes>()(
  persist(
    (set) => ({
      isDarkMode: true,
      onDarkMode: () => set({ isDarkMode: true }),
      onLightMode: () => set({ isDarkMode: false }),
    }),
    {
      name: 'DarkModeStore',
    },
  ),
);
