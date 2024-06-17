import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { GroupState, selectGroupSlice } from './select-group-slice';

type SliceCreator = GroupState;

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
