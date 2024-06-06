import fileBlue1Icon from '@assets/icons/file-blue1.svg';
import fileBlue4Icon from '@assets/icons/file-blue4.svg';
import fileLongBlue1Icon from '@assets/icons/file-long-blue1.svg';
import fileLongBlue4Icon from '@assets/icons/file-long-blue4.svg';
import folderBlueIcon from '@assets/icons/folder-blue.svg';
import folderWhiteIcon from '@assets/icons/folder-white.svg';
import monitorIcon from '@assets/icons/monitor.svg';
import settingIcon from '@assets/icons/setting.svg';
import vectorLongIcon from '@assets/icons/vector-long.svg';
import vectorIcon from '@assets/icons/vector.svg';

export const QUICK_BUTTONS = {
  'make-meeting': {
    backgroundImg: folderBlueIcon,
    innerImg: monitorIcon,
    innerImgAlt: '모니터',
    label: '회의 생성',
  },
  'user-info': { backgroundImg: folderWhiteIcon, innerImg: settingIcon, innerImgAlt: '세팅', label: '내 정보' },
};

export const FILE_IMGS = {
  short: {
    basic: fileBlue4Icon,
    hover: fileBlue1Icon,
    vector: vectorIcon,
  },
  long: {
    basic: fileLongBlue4Icon,
    hover: fileLongBlue1Icon,
    vector: vectorLongIcon,
  },
};
