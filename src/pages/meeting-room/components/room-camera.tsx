import { device } from '@styles/breakpoints';
import styled from 'styled-components';
import CalculateCameraWidth from '../utils/calculate-camera-width';

interface RoomCameraProps {
  cameraCount: number;
}

const RoomCamera = ({ cameraCount }: RoomCameraProps) => {
  return <S.Container $cameraCount={cameraCount}></S.Container>;
};

export default RoomCamera;

const S = {
  Container: styled.video<{ $cameraCount: number }>`
    aspect-ratio: 16 / 9;
    width: ${({ $cameraCount }) => CalculateCameraWidth($cameraCount)};
    min-width: 350px;
    border-radius: 10px;
    background: #f1f1f1;
    @media ${device.tablet} {
      width: ${({ $cameraCount }) => ($cameraCount === 1 ? 'calc(70% - 10px)' : 'calc(40% - 10px)')};
      min-width: 330px;
    }
    @media ${device.mobile} {
      width: calc(70% - 10px);
      min-width: 250px;
    }
  `,
};
