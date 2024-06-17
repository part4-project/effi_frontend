import { create } from 'zustand';
import { UserListState, selectUserListSlice } from './select-meeting-slice';

type SliceCreator = UserListState;

export const useMeetingStore = create<SliceCreator>((...set) => ({
  ...selectUserListSlice(...set),
}));
