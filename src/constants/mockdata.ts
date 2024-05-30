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
  start_date: '24-05-30 12:00',
  expected_end_date: '24-05-30 14:00',
  actual_end_date: '24-05-30 14:18',
};

export const TOPIC = {
  meeting_id: 3,
  count: 3,
  topic_list: [
    {
      id: 1,
      topic_name: '- R&R 분배',
      is_completed: true,
    },
    {
      id: 2,
      topic_name: '- 회식 장소 정하기',
      is_completed: true,
    },
    {
      id: 3,
      topic_name: '- 분배한 작업 끝내기',
      is_completed: false,
    },
  ],
};

//ERD 설계에는 안보입니다 ㅜㅠ
export const CHAT = {
  chat: [
    {
      id: 1,
      nickname: '경수',
      email: 'effi@naver.com',
      chat: '안녕하세요!',
    },
    {
      id: 2,
      nickname: '승구',
      email: 'skoo@naver.com',
      chat: '반갑습니다 ㅎ',
    },
    {
      id: 3,
      nickname: '재성',
      email: 'js@naver.com',
      chat: '하이요!',
    },
  ],
};
