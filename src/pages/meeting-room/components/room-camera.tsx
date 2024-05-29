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
    flex: 1;
    aspect-ratio: 16 / 9;
    max-width: ${({ $cameraCount }) => CalculateCameraWidth($cameraCount)};
    min-width: calc(30%);
    border-radius: 10px;
    background: #f1f1f1;
  `,
};
