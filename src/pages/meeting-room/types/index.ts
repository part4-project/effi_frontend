import { TGroupFetchMemberInfo } from '@api/group/group-request.type';

export type RoomButton = '카메라' | '마이크' | '나가기';

export interface RoomButtonType {
  type: RoomButton;
  initialImg: string;
  changedImg: string | null;
}

export interface TChatSocketType {
  type: string;
  meetingId: number;
  userId: number;
  message: string;
  timeStamp: string;
}

export interface TChatType extends TGroupFetchMemberInfo {
  message: string;
  timeStamp: string;
  type: string;
  userId: number;
}

export type TChatListType = TChatType[];
