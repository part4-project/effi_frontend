/* eslint-disable no-unused-vars */
import { StateCreator } from 'zustand';

export interface LobbyGroupState {
  lobbyGroupId: number;
  setLobbyGroupId: (lobbyGroupId: number) => void;
  initLobbyGroupId: () => void;
}

export const selectLobbyGroupSlice: StateCreator<LobbyGroupState> = (set) => ({
  lobbyGroupId: 0,
  setLobbyGroupId: (lobbyGroupId: number) => set({ lobbyGroupId }),
  initLobbyGroupId: () => set(() => ({ lobbyGroupId: 0 })),
});
