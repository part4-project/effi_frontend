import cameraOffWhiteImg from '@assets/icons/camera-off-white.svg';
import cameraOffImg from '@assets/icons/camera-off.svg';
import cameraImg from '@assets/icons/camera.svg';
import micOffWhiteImg from '@assets/icons/mic-off-white.svg';
import micOffImg from '@assets/icons/mic-off.svg';
import micImg from '@assets/icons/mic.svg';
import roomOutImg from '@assets/icons/room-out.svg';
import screenShareImg from '@assets/icons/screen-share.svg';
import { RoomButtonType } from '../types';

export const ROOM_BUTTONS: RoomButtonType[] = [
  { type: '화면공유', initialImg: screenShareImg, changedImg: null, changedWhiteImg: null },
  { type: '카메라', initialImg: cameraOffImg, changedImg: cameraImg, changedWhiteImg: cameraOffWhiteImg },
  { type: '마이크', initialImg: micOffImg, changedImg: micImg, changedWhiteImg: micOffWhiteImg },
  {
    type: '나가기',
    initialImg: roomOutImg,
    changedImg: null,
    changedWhiteImg: null,
  },
];
