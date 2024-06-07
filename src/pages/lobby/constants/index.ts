import folderBlueIcon from '@assets/icons/folder-blue.svg';
import folderWhiteIcon from '@assets/icons/folder-white.svg';
import monitorIcon from '@assets/icons/monitor.svg';
import settingIcon from '@assets/icons/setting.svg';

export const QUICK_BUTTONS = {
  'make-meeting': {
    backgroundImg: folderBlueIcon,
    innerImg: monitorIcon,
    innerImgAlt: '모니터',
    label: '회의 생성',
  },
  'user-info': { backgroundImg: folderWhiteIcon, innerImg: settingIcon, innerImgAlt: '세팅', label: '내 정보' },
};
