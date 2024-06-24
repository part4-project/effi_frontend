export interface TMeetingRoom {
  id: number;
  group_id: number;
  title: string;
  start_date: string;
  expected_end_date: string;
  actual_end_date: string;
}

export interface Topic {
  id: number;
  topic_name: string;
  is_completed: boolean;
}

export interface TTopic {
  meeting_id: number;
  count: number;
  topic_list: Topic[];
}

export interface TMyScheduleItem {
  id: number;
  group: string;
  start_date: string;
  expected_end_date: string;
  title: string;
}

export interface TNoteItem {
  groupId: number;
  meetingId: number;
  startDate: number;
  expectedEndDate: number;
  actualEndDate: null;
  topiclist: Topic[];
  participantList: { userId: number; roomId: number; profileImageUrl: string }[];
}

export interface TGroup {
  id: number;
  room_name: string;
  code: string;
}

export interface TUser {
  id: number;
  nickname: string;
  email: string;
  invited_group: TGroup[];
}
