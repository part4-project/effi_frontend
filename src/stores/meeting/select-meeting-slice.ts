/* eslint-disable no-unused-vars */
import { TGroupFetchMemberInfo } from '@api/group/group-request.type';
import { StateCreator } from 'zustand';

export interface UserListState {
  memberList: TGroupFetchMemberInfo[];
  setMemberList: (memberList: TGroupFetchMemberInfo[]) => void;
  removeMemberList: () => void;
}

export const selectUserListSlice: StateCreator<UserListState> = (set) => ({
  memberList: [],
  setMemberList: (memberList: TGroupFetchMemberInfo[]) => set({ memberList }),
  removeMemberList: () => set(() => ({ memberList: [] })),
});
