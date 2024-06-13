import { create } from 'zustand';
import { groupState, selectGroupSlice } from './select-group-slice';

type SliceCreator = groupState;

export const useGroupStore = create<SliceCreator>((...args) => ({
  ...selectGroupSlice(...args),
}));
