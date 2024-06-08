export const calculateCameraWidth = (cameraCount: number, type: 'width' | 'max-width') => {
  let value = '';
  switch (cameraCount) {
    case 1:
      value = type === 'max-width' ? '950px' : 'calc(70% - 10px)';
      break;
    case 2:
      value = type === 'max-width' ? '675px' : 'calc(50% - 10px)';
      break;
    case 3:
    case 4: // 3 또는 4인 경우
      value = type === 'max-width' ? '538px' : 'calc(40% - 10px)';
      break;
    default:
      value = type === 'max-width' ? '446px' : 'calc(33.3% - 10px)';
      break;
  }
  return value;
};
