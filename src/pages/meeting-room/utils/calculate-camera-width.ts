const CalculateCameraWidth = (cameraCount: number) => {
  let width = '';
  switch (cameraCount) {
    case 1:
      width = 'calc(70% - 10px)';
      break;
    case 2:
      width = 'calc(50% - 10px)';
      break;
    case 3:
    case 4: // 3 또는 4인 경우
      width = 'calc(40% - 10px)';
      break;
    default:
      width = 'calc(33.3% - 10px)';
      break;
  }
  return width;
};

export default CalculateCameraWidth;
