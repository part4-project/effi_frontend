import { create } from 'zustand';
import { LobbyGroupState, selectLobbyGroupSlice } from './lobby-group-slice';

export const useLobbyGroupStore = create<LobbyGroupState>((...set) => ({
  ...selectLobbyGroupSlice(...set),
}));
