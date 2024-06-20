import { getRandomNum } from '@utils/get-random-num';

const DEFAULT_PROFILE_NUM = 6;
export const USER = {
  id: 1,
  nickname: '경수',
  email: 'effi@naver.com',
  profile_img: `/default-profile/default-profile${getRandomNum(DEFAULT_PROFILE_NUM)}.svg`,
  invited_group: [
    {
      id: 1,
      room_name: 'A그룹',
      code: 'a2f8',
      leader: '홍길동',
    },
    {
      id: 2,
      room_name: 'EFFI 프론트엔드',
      code: 'a2f8',
      leader: '홍길동',
    },
    {
      id: 3,
      room_name: 'EFFI 백엔드',
      code: 'a2f8',
      leader: '홍길동',
    },
    {
      id: 4,
      room_name: 'B그룹',
      code: 'a2f8',
      leader: '홍길동',
    },
    {
      id: 5,
      room_name: '이름이 매우 긴 그룹 테스트용 그룹 이름 제한 몇자로 할껀지?',
      code: 'a2f8',
      leader: '홍길동',
    },
    {
      id: 6,
      room_name: 'EFFI 프론트엔드',
      code: 'a2f8',
      leader: '홍길동',
    },
    {
      id: 7,
      room_name: 'EFFI 백엔드',
      code: 'a2f8',
      leader: '홍길동',
    },
    {
      id: 8,
      room_name: 'C그룹',
      code: 'a2f8',
      leader: '홍길동',
    },
  ],
};

export const GROUP = {
  id: 2,
  room_name: '에피의 회의실',
  code: 'a2f8',
};

export const GROUP_LIST = [
  {
    id: 2,
    room_name: '에피',
  },
  {
    id: 3,
    room_name: '회의실',
  },
  {
    id: 4,
    room_name: 'EFFI',
  },
  {
    id: 5,
    room_name: '에피의 회의실',
  },
  {
    id: 6,
    room_name: '에피의 회의실 & 줄넘김 테스트',
  },
];

export const GROUP_MEMBER = {
  group_id: 2,
  count: 5,
  member_list: [
    {
      id: 1,
      name: '경수',
      is_admin: true,
    },
    {
      id: 2,
      name: '작은재성입니다',
      is_admin: false,
    },
    {
      id: 3,
      name: '원석',
      is_admin: false,
    },
    {
      id: 4,
      name: '승구',
      is_admin: false,
    },
    {
      id: 5,
      name: '큰재성',
      is_admin: false,
    },
    {
      id: 6,
      name: '경수',
      is_admin: false,
    },
    {
      id: 7,
      name: 'test1',
      is_admin: false,
    },
    {
      id: 8,
      name: 'test2',
      is_admin: false,
    },
    {
      id: 9,
      name: 'test3',
      is_admin: false,
    },
    {
      id: 10,
      name: 'test4',
      is_admin: false,
    },
    {
      id: 11,
      name: 'test5',
      is_admin: false,
    },
    {
      id: 12,
      name: 'test6',
      is_admin: false,
    },
  ],
};

export const MEETING_ROOM = {
  id: 3,
  group_id: 2,
  title: '프론트엔드 R&R 논의',
  start_date: '2024. 5. 30. 오후 13:00',
  expected_end_date: '2024. 5. 30. 오후 14:00',
  actual_end_date: '2024. 5. 30. 오후 14:18',
};

export const TOPIC = {
  meeting_id: 3,
  count: 3,
  topic_list: [
    {
      id: 1,
      topic_name: 'R&R 분배',
      is_completed: true,
    },
    {
      id: 2,
      topic_name: '회식 장소 정하기',
      is_completed: true,
    },
    {
      id: 3,
      topic_name: '분배한 작업 끝내기',
      is_completed: true,
    },
    {
      id: 4,
      topic_name: 'test',
      is_completed: false,
    },
    {
      id: 5,
      topic_name: 'test1',
      is_completed: false,
    },
    {
      id: 6,
      topic_name: 'test2',
      is_completed: false,
    },
  ],
};

export const NOTES_DATAS = [
  {
    id: 1,
    title: '프론트 회의',
    createdAt: '24-03-29',
    topic_list: [
      {
        id: 1,
        topic_name: 'R&R 분배',
        is_completed: true,
      },
      {
        id: 2,
        topic_name: '회식 장소 정하기',
        is_completed: true,
      },
      {
        id: 3,
        topic_name: '분배한 작업 끝내기',
        is_completed: true,
      },
    ],
  },
  {
    id: 2,
    title: '주간 회의',
    createdAt: '24-03-29',
    topic_list: [
      {
        id: 1,
        topic_name: 'R&R 분배',
        is_completed: false,
      },
      {
        id: 2,
        topic_name: '회식 장소 정하기',
        is_completed: true,
      },
      {
        id: 3,
        topic_name: '분배한 작업 끝내기',
        is_completed: false,
      },
    ],
  },
  {
    id: 3,
    title: '백엔드 회의',
    createdAt: '24-04-12',
    topic_list: [
      {
        id: 1,
        topic_name: 'R&R 분배',
        is_completed: true,
      },
      {
        id: 2,
        topic_name: '회식 장소 정하기',
        is_completed: true,
      },
      {
        id: 3,
        topic_name: '분배한 작업 끝내기',
        is_completed: false,
      },
    ],
  },
  {
    id: 4,
    title: '프론트 회의',
    createdAt: '24-04-20',
    topic_list: [
      {
        id: 1,
        topic_name: 'R&R 분배',
        is_completed: true,
      },
      {
        id: 2,
        topic_name: '회식 장소 정하기',
        is_completed: true,
      },
      {
        id: 3,
        topic_name: '분배한 작업 끝내기',
        is_completed: false,
      },
    ],
  },
  {
    id: 5,
    title: '주간 회의',
    createdAt: '24-04-21',
    topic_list: [
      {
        id: 1,
        topic_name: 'R&R 분배',
        is_completed: true,
      },
      {
        id: 2,
        topic_name: '회식 장소 정하기',
        is_completed: true,
      },
      {
        id: 3,
        topic_name: '분배한 작업 끝내기',
        is_completed: false,
      },
    ],
  },
  {
    id: 6,
    title: '회식날짜 정하기',
    createdAt: '24-05-01',
    topic_list: [
      {
        id: 1,
        topic_name: 'R&R 분배',
        is_completed: true,
      },
      {
        id: 2,
        topic_name: '회식 장소 정하기',
        is_completed: true,
      },
      {
        id: 3,
        topic_name: '분배한 작업 끝내기',
        is_completed: false,
      },
    ],
  },
  {
    id: 7,
    title: '백엔드 회의',
    createdAt: '24-05-10',
    topic_list: [
      {
        id: 1,
        topic_name: 'R&R 분배',
        is_completed: true,
      },
      {
        id: 2,
        topic_name: '회식 장소 정하기',
        is_completed: true,
      },
      {
        id: 3,
        topic_name: '분배한 작업 끝내기',
        is_completed: false,
      },
    ],
  },
];

export const CHAT = {
  chat: [
    {
      type: 'ENTER',
      userId: 7,
      meetingId: 1,
      message: '멋있는 자전거 님이 입장하셨습니다',
      timeStamp: '2024-06-19T06:21:01.135',
    },
    { type: 'CHAT', userId: 7, meetingId: 1, message: '123', timeStamp: '2024-06-19T06:21:03.906' },
    { type: 'CHAT', userId: 7, meetingId: 1, message: '123', timeStamp: '2024-06-19T06:21:04.37' },
    { type: 'CHAT', userId: 7, meetingId: 1, message: '123', timeStamp: '2024-06-19T06:21:04.761' },
    {
      type: 'ENTER',
      userId: 7,
      meetingId: 5,
      message: '황경수 님이 입장하셨습니다',
      timeStamp: '2024-06-19T06:21:01.135',
    },
    { type: 'CHAT', userId: 5, meetingId: 1, message: '123', timeStamp: '2024-06-19T06:21:03.906' },
    { type: 'CHAT', userId: 5, meetingId: 1, message: '123', timeStamp: '2024-06-19T06:21:04.37' },
    { type: 'CHAT', userId: 5, meetingId: 1, message: '123', timeStamp: '2024-06-19T06:21:04.761' },
  ],
};

export const MY_SCHEDULE_LIST = [
  {
    id: 1,
    group: '그룹1',
    start_date: '24-05-30 12:00',
    expected_end_date: '24-05-30 14:00',
    title: '프론트회의',
  },
  {
    id: 2,
    group: '그룹2',
    start_date: '24-05-30 15:00',
    expected_end_date: '24-05-30 16:00',
    title: '백엔드회의',
  },
  {
    id: 3,
    group: '그룹3',
    start_date: '24-05-30 17:00',
    expected_end_date: '24-05-30 20:00',
    title: '전체회의',
  },
  {
    id: 4,
    group: '그룹4',
    start_date: '24-05-31 16:00',
    expected_end_date: '24-05-31 18:00',
    title: 'webRTC 자료 공유',
  },
  {
    id: 5,
    group: '그룹5',
    start_date: '24-06-01 16:00',
    expected_end_date: '24-06-01 18:00',
    title: 'webSocket 자료 공유',
  },
  {
    id: 6,
    group: '그룹6',
    start_date: '24-06-01 20:00',
    expected_end_date: '24-06-01 22:00',
    title: 'API 회의',
  },
  {
    id: 7,
    group: '그룹7',
    start_date: '24-06-12 20:00',
    expected_end_date: '24-06-12 22:00',
    title: 'API 회의2',
  },
];

export const EXPECTED_END_TIME_LIST = [
  '30분',
  '1시간',
  '1시간 30분',
  '2시간',
  '2시간 30분',
  '3시간',
  '3시간 30분',
  '4시간',
];

export const ALARM_LIST = [
  {
    id: 1,
    type: 'invite',
    group_name: 'A그룹',
    remind_time: 0,
  },
  {
    id: 2,
    type: 'meeting',
    group_name: 'A그룹',
    remind_time: 5,
  },
  {
    id: 3,
    type: 'invite',
    group_name: 'A그A그A그A그A그A그A그A그룹',
    remind_time: 0,
  },
  {
    id: 4,
    type: 'meeting',
    group_name: 'A그룹A그A그A그A그A그A그A그A그A그A그',
    remind_time: 5,
  },
  {
    id: 5,
    type: 'invite',
    group_name: 'A그룹A그룹A그',
    remind_time: 0,
  },
  {
    id: 6,
    type: 'meeting',
    group_name: 'A그룹',
    remind_time: 10,
  },
];
