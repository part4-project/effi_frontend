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
    border-radius: 10px;
    background: #f1f1f1;
  `,
};
