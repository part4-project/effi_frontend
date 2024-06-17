import ADD_GROUP_BTN_DARK from '@assets/add-group-btn-dark.svg';
import ADD_GROUP_BTN from '@assets/add-group-btn.svg';
import GROUP_BG_DARK from '@assets/group-bg-dark.svg';
import GROUP_BG from '@assets/group-bg.svg';
import ALARM_ACTIVE_DARK from '@assets/icons/alarm-active-dark.svg';
import ALARM_ACTIVE from '@assets/icons/alarm-active.svg';
import ALARM_DARK from '@assets/icons/alarm-dark.svg';
import ALARM_EMPTY_DARK from '@assets/icons/alarm-empty-dark.svg';
import ALARM_EMPTY from '@assets/icons/alarm-empty.svg';
import ALARM from '@assets/icons/alarm.svg';
import ARROW_DOWN_DARK from '@assets/icons/arrow-down-dark.svg';
import ARROW_DOWN from '@assets/icons/arrow-down.svg';
import ARROW_RIGHT_DARK from '@assets/icons/arrow-right-dark.svg';
import ARROW_RIGHT from '@assets/icons/arrow-right.svg';
import CALENDAR_ICON_DARK from '@assets/icons/calendar-dark.svg';
import CALENDAR_ICON from '@assets/icons/calendar.svg';
import EDIT_ICON_WHITE from '@assets/icons/edit-white.svg';
import EDIT_ICON from '@assets/icons/edit.svg';
import FOLDER_BLUE from '@assets/icons/folder-blue.svg';
import FOLDER_DARK from '@assets/icons/folder-dark.svg';
import FOLDER_GRAY from '@assets/icons/folder-gray.svg';
import FOLDER_WHITE from '@assets/icons/folder-white.svg';
import GROUP_LEADER_BADGE_DARK from '@assets/icons/group-leader-badge-dark.svg';
import GROUP_LEADER_BADGE from '@assets/icons/group-leader-badge.svg';
import MEETING_ALARM_DARK from '@assets/icons/meeting-alarm-dark.svg';
import MEETING_ALARM from '@assets/icons/meeting-alarm.svg';
import ON_LIVE_CHARACTER_DARK from '@assets/icons/meeting-live-character-dark.svg';
import ON_LIVE_CHARACTER from '@assets/icons/meeting-live-character.svg';
import ON_SCHEDULED_CHARACTER_DARK from '@assets/icons/meeting-reserve-chracter-dark.svg';
import ON_SCHEDULED_CHARACTER from '@assets/icons/meeting-reserve-chracter.svg';
import MONITOR_DARK from '@assets/icons/monitor-dark.svg';
import MONITOR_GRAY from '@assets/icons/monitor-gray.svg';
import MONITOR from '@assets/icons/monitor.svg';
import MONITOR_BLUE from '@assets/icons/plus-monitor.svg';
import POLYGON_DARK_TOP from '@assets/icons/polygon-dark-top.svg';
import POLYGON_GRAY_TOP from '@assets/icons/polygon-gray-top.svg';
import POLYGON_TOP from '@assets/icons/polygon-top.svg';
import POLYGON_WHITE_TOP from '@assets/icons/polygon-white-top.svg';
import REFRESH_CALENDAR_DARK from '@assets/icons/refresh-calendar-dark.svg';
import REFRESH_CALENDAR from '@assets/icons/refresh-calendar.svg';
import SEARCH_ICON_DARK from '@assets/icons/search-dark.svg';
import SEARCH_ICON from '@assets/icons/search.svg';
import SETTING_GRAY from '@assets/icons/setting-gray.svg';
import SETTING from '@assets/icons/setting.svg';
import LOBBY_BTN_DARK from '@assets/lobby-btn-dark.svg';
import LOBBY_BTN from '@assets/lobby-btn.svg';
import LOGO_DARK from '@assets/logo-dark.svg';
import LOGO from '@assets/logo.svg';
import TEXT_LOGO_DARK from '@assets/text-logo-dark.svg';
import TEXT_LOGO from '@assets/text-logo.svg';

export const lightModeTheme = {
  //color
  theme01: 'var(--blue01)',
  theme02: 'var(--blue02)',
  theme03: 'var(--blue03)',
  theme04: 'var(--blue04)',
  theme05: 'var(--blue05)',
  theme06: 'var(--white)',
  theme07: 'var(--white)',
  theme08: 'var(--blue04)',

  //text color
  text01: 'var(--white)',
  text02: 'var(--blue01)',
  text03: 'var(--blue05)',
  text04: 'var(--blue05)',
  text05: 'var(--dark04)',
  text06: 'var(--blue01)',

  //button color
  button01: 'var(--blue02)',

  //img
  logo: LOGO,
  textLogo: TEXT_LOGO,
  addGroupBtn: ADD_GROUP_BTN,
  groupBg: GROUP_BG,
  lobbyBtn: LOBBY_BTN,

  //icon
  alarm: ALARM,
  alarmEmpty: ALARM_EMPTY,
  alarmActive: ALARM_ACTIVE,
  polygonTopWhite: '/polygon-top-white.svg',
  polygonTopBlue: '/polygon-top-blue.svg',
  polygonLeft: '/polygon-left.svg',
  polygonScheduleTop: POLYGON_WHITE_TOP,
  polygonMeetingTop: POLYGON_TOP,
  folderMeeting: FOLDER_BLUE,
  folderInfo: FOLDER_WHITE,
  onLiveCharacter: ON_LIVE_CHARACTER,
  onScheduledCharacter: ON_SCHEDULED_CHARACTER,
  search: SEARCH_ICON,
  calendar: CALENDAR_ICON,
  monitor: MONITOR,
  monitorLeader: MONITOR_BLUE,
  setting: SETTING,
  editIcon: EDIT_ICON,
  arrowDown: ARROW_DOWN,
  arrowRight: ARROW_RIGHT,
  refreshIcon: REFRESH_CALENDAR,
  meetingAlarm: MEETING_ALARM,
  groupLeaderBadge: GROUP_LEADER_BADGE,

  //other
  nickName: 'var(--dark02)',
  scroll: 'var(--white)',
  scrollAlarm: 'var(--blue03)',
  scrollBar: 'var(--gray01)',
  quickButtonHover: 'var(--white)',
  schedule: 'var(--white)',
  scheduleText: 'var(--black)',
  meetingDropDown: 'var(--blue03)',
  boxShadow: 'rgba(166, 196, 213, 0.57)',
  dot: 'var(--blue01)',
  percentBar: 'var(--blue04)',
  line: 'var(--blue02)',
};

export const darkModeTheme = {
  //color
  theme01: 'var(--dark01)',
  theme02: 'var(--dark02)',
  theme03: 'var(--dark03)',
  theme04: 'var(--dark04)',
  theme05: 'var(--dark05)',
  theme06: 'var(--dark06)',
  theme07: 'var(--dark07)',
  theme08: 'var(--dark08)',

  //text color
  text01: 'var(--dark01)',
  text02: 'var(--dark07)',
  text03: 'var(--dark07)',
  text04: 'var(--dark01)',
  text05: 'var(--dark08)',
  text06: 'var(--dark08)',

  //button color
  button01: 'var(--dark07)',

  //img
  logo: LOGO_DARK,
  textLogo: TEXT_LOGO_DARK,
  addGroupBtn: ADD_GROUP_BTN_DARK,
  groupBg: GROUP_BG_DARK,
  lobbyBtn: LOBBY_BTN_DARK,

  //icon
  alarm: ALARM_DARK,
  alarmEmpty: ALARM_EMPTY_DARK,
  alarmActive: ALARM_ACTIVE_DARK,
  polygonTopWhite: '/polygon-top-gray.svg',
  polygonTopBlue: '/polygon-top-dark.svg',
  polygonLeft: '/polygon-left-dark.svg',
  polygonScheduleTop: POLYGON_DARK_TOP,
  polygonMeetingTop: POLYGON_GRAY_TOP,
  folderMeeting: FOLDER_GRAY,
  folderInfo: FOLDER_DARK,
  onLiveCharacter: ON_LIVE_CHARACTER_DARK,
  onScheduledCharacter: ON_SCHEDULED_CHARACTER_DARK,
  search: SEARCH_ICON_DARK,
  calendar: CALENDAR_ICON_DARK,
  monitor: MONITOR_DARK,
  monitorLeader: MONITOR_GRAY,
  setting: SETTING_GRAY,
  editIcon: EDIT_ICON_WHITE,
  arrowDown: ARROW_DOWN_DARK,
  arrowRight: ARROW_RIGHT_DARK,
  refreshIcon: REFRESH_CALENDAR_DARK,
  meetingAlarm: MEETING_ALARM_DARK,
  groupLeaderBadge: GROUP_LEADER_BADGE_DARK,

  //other
  nickName: 'var(--dark07)',
  scroll: 'var(--gray03)',
  scrollAlarm: 'var(--gray03)',
  scrollBar: 'var(--dark02)',
  quickButtonHover: 'var(--white)',
  schedule: 'var(--dark05)',
  scheduleText: 'var(--dark07)',
  meetingDropDown: 'var(--dark07)',
  boxShadow: 'rgba(22, 22, 22, 0.57)',
  dot: 'var(--yellow01)',
  percentBar: 'var(--dark06)',
  line: 'var(--gray02)',
};
