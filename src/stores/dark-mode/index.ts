import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DarkModeStoreTypes, darkModeSlice } from './dark-mode-slice';

type SliceCreator = DarkModeStoreTypes;

export const useDarkModeStore = create<SliceCreator>()(
  persist(
    (...set) => ({
      ...darkModeSlice(...set),
    }),
    {
      name: 'darkmode-storage',
    },
  ),
);
