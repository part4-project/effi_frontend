import { StateCreator } from 'zustand';

export interface groupState {}

export const selectGroupSlice: StateCreator<groupState> = (set) => ({
  groupId: 0,
  setGroupId: (id: number) => set({ groupId: id }),
  initGroupId: () => set(() => ({ groupId: 0 })),
});
