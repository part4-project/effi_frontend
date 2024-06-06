export type RoomButton = '카메라' | '마이크' | '나가기';

export interface RoomButtonType {
  type: RoomButton;
  initialImg: string;
  changedImg: string | null;
}
