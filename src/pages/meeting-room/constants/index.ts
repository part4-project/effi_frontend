import cameraOffImg from '@assets/icons/camera-off.svg';
import cameraImg from '@assets/icons/camera.svg';
import micOffImg from '@assets/icons/mic-off.svg';
import micImg from '@assets/icons/mic.svg';
import roomOutImg from '@assets/icons/room-out.svg';
import { RoomButtonType } from '../types';

export const ROOM_BUTTONS: RoomButtonType[] = [
  { type: '카메라', initialImg: cameraOffImg, changedImg: cameraImg },
  { type: '마이크', initialImg: micOffImg, changedImg: micImg },
  {
    type: '나가기',
    initialImg: roomOutImg,
    changedImg: null,
  },
];
