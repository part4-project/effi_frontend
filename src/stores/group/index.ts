import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { groupState, selectGroupSlice } from './select-group-slice';

type SliceCreator = groupState;

export const useGroupStore = create<SliceCreator>()(
  persist(
    (...set) => ({
      ...selectGroupSlice(...set),
    }),
    {
      name: 'group-storage', // 로컬 스토리지에 저장될 키 이름
    },
  ),
);
