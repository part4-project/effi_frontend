// requset

// response
export interface TGroupFetchInfo {
  groupId: number;
  groupName: string;
  groupCode?: string;
  sortNum?: number;
  admin?: boolean;
}
export type TGroupFetchRes = TGroupFetchInfo[];

export interface TGroupFetchMemberInfo {
  id: number;
  nickname: string;
  profileImageUrl: string;
  email: string;
  admin: boolean;
}
export interface TGroupMemberFetchRes {
  code: string;
  groupName: string;
  memberList: TGroupFetchMemberInfo[];
}

export interface TGroupUpdateRes {
  groupId: number;
  groupName: string;
  code: string;
  groupState: string;
  createdAt: string;
  modifiedAt: string | null;
}

export interface TGroupCreateRes {
  id: number;
  groupName: string;
  code: string;
  groupState: string;
  createdAt: string;
  modifiedAt: string | null;
}

export interface TInvitedGroupFetchRes {
  invitorId: number;
  invitorName: string;
  groupId: number;
  groupName: string;
  code: string;
  createdAt: string;
  modifiedAt: string | null;
}
