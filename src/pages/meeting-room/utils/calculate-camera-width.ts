const CalculateCameraWidth = (cameraCount: number) => {
  if (cameraCount === 1) {
    return 'calc(70%)';
  } else if (cameraCount === 2) {
    return 'calc(50%)';
  } else if (cameraCount >= 3) {
    return 'calc(30%)';
  }
};

export default CalculateCameraWidth;
