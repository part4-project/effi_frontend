import { StateCreator } from 'zustand';

export interface DarkModeStoreTypes {
  isDarkMode: boolean;
  onDarkMode: () => void;
  onLightMode: () => void;
}

export const darkModeSlice: StateCreator<DarkModeStoreTypes> = (set) => ({
  isDarkMode: false,
  onDarkMode: () => set({ isDarkMode: true }),
  onLightMode: () => set({ isDarkMode: false }),
});
