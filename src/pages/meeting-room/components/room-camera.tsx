import { device } from '@styles/breakpoints';
import styled from 'styled-components';
import CalculateCameraWidth from '../utils/calculate-camera-width';

interface RoomCameraProps {
  cameraCount: number;
  name: string;
}

const RoomCamera = ({ cameraCount, name }: RoomCameraProps) => {
  return (
    <S.Container $cameraCount={cameraCount}>
      <video src=""></video>
      <div>{name}</div>
    </S.Container>
  );
};

export default RoomCamera;

const S = {
  Container: styled.div<{ $cameraCount: number }>`
    position: relative;
    aspect-ratio: 16 / 9;
    width: ${({ $cameraCount }) => CalculateCameraWidth($cameraCount)};
    min-width: 350px;
    @media ${device.tablet} {
      width: ${({ $cameraCount }) => ($cameraCount === 1 ? 'calc(70% - 10px)' : 'calc(40% - 10px)')};
      min-width: 330px;
    }
    @media ${device.mobile} {
      width: calc(70% - 10px);
      min-width: 250px;
    }
    video {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: black;
    }
    div {
      position: absolute;
      background-color: #212322;
      padding: 5px 10px;
      border-radius: 5px;
      opacity: 0.8;
      color: #fff;
      text-align: center;
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      bottom: 8px;
      left: 8px;
    }
  `,
};
