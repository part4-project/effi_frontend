/* eslint-disable no-unused-vars */
import { StateCreator } from 'zustand';

export interface groupState {
  groupId: number;
  setGroupId: (id: number) => void;
  initGroupId: () => void;
}

export const selectGroupSlice: StateCreator<groupState> = (set) => ({
  groupId: 0,
  setGroupId: (groupId: number) => set({ groupId }),
  initGroupId: () => set(() => ({ groupId: 0 })),
});
