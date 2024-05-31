const CalculateCameraWidth = (cameraCount: number) => {
  let width = '';
  switch (cameraCount) {
    case 1:
      width = 'calc(70% - 20px)';
      break;
    case 2:
      width = 'calc(50% - 20px)';
      break;
    case 3:
    case 4: // 3 또는 4인 경우
      width = 'calc(40% - 20px)';
      break;
    case 5:
    case 6: // 5 또는 6인 경우
      width = 'calc(33.3% - 20px)';
      break;
    default:
      width = 'calc(25% - 20px)'; // 7 이상인 경우
      break;
  }
  return width;
};

export default CalculateCameraWidth;
