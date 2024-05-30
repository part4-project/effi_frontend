export const USER = [
  {
    id: 1,
    nickname: '경수',
    email: 'effi@naver.com',
  },
];

export const GROUP = {
  id: 2,
  room_name: '에피의 회의실',
  code: 'a2f8',
};

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
      name: '작은재성',
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
      is_completed: false,
    },
  ],
};
export const NOTES_DATAS = [
  {
    id: 1,
    title: '프론트 회의',
    createdAt: '24-05-29',
  },
  {
    id: 2,
    title: '주간 회의',
    createdAt: '24-05-29',
  },
  {
    id: 3,
    title: '백엔드 회의',
    createdAt: '24-05-29',
  },
  {
    id: 4,
    title: '프론트 회의',
    createdAt: '24-05-29',
  },
  {
    id: 5,
    title: '주간 회의',
    createdAt: '24-05-29',
  },
  {
    id: 6,
    title: '회식날짜 정하기',
    createdAt: '24-05-29',
  },
  {
    id: 7,
    title: '백엔드 회의',
    createdAt: '24-05-29',
  },
];

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
];
