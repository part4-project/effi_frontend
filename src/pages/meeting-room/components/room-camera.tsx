import { device } from '@styles/breakpoints';
import styled from 'styled-components';
import { calculateCameraWidth } from '../utils/calculate-camera-width';

interface RoomCameraProps {
  cameraCount: number;
  name: string;
}

const RoomCamera = ({ cameraCount, name }: RoomCameraProps) => {
  return (
    <S.Container $cameraCount={cameraCount}>
      <S.Video src="" />
      <S.Name>{name}</S.Name>
    </S.Container>
  );
};

export default RoomCamera;

const S = {
  Container: styled.div<{ $cameraCount: number }>`
    position: relative;
    aspect-ratio: 16 / 9;
    width: ${({ $cameraCount }) => calculateCameraWidth($cameraCount, 'width')};
    max-width: ${({ $cameraCount }) => calculateCameraWidth($cameraCount, 'max-width')};
    @media ${device.tablet} {
      width: ${({ $cameraCount }) => ($cameraCount === 1 ? 'calc(70% - 10px)' : 'calc(40% - 10px)')};
      min-width: 330px;
    }
    @media ${device.mobile} {
      width: calc(70% - 10px);
      min-width: 250px;
    }
  `,
  Video: styled.video`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: var(--black);
  `,
  Name: styled.p`
    position: absolute;
    background-color: #212322;
    padding: 5px 10px;
    border-radius: 5px;
    opacity: 0.8;
    color: var(--white);
    font-weight: 700;
    bottom: 8px;
    left: 8px;
  `,
};
