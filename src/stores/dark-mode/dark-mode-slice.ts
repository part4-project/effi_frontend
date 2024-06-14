import { StateCreator } from 'zustand';

export interface DarkModeStoreTypes {
  isDarkMode: boolean;
  modeName: string;
  onDarkMode: () => void;
  onLightMode: () => void;
}

export const darkModeSlice: StateCreator<DarkModeStoreTypes> = (set) => ({
  isDarkMode: false,
  modeName: '라이트 모드',
  onDarkMode: () => set({ isDarkMode: true, modeName: '다크 모드' }),
  onLightMode: () => set({ isDarkMode: false, modeName: '라이트 모드' }),
});
