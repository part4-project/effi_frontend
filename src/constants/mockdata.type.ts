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
  id: number;
  title: string;
  createdAt: string;
  topic_list: Topic[];
}
