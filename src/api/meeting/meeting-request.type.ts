// request
interface Topic {
  topicName: string;
  isCompleted: boolean;
  orderIndex: number;
}
export interface TMeetingCreateReq {
  meetingTitle: string;
  startDate: string;
  expectedEndDate: string;
  topicList: Topic[];
}

// response
export interface TMeetingCreateRes {
  id: number;
  meetingTitle: string;
  startDate: string;
  expectedEndDate: string;
  createdAt: string;
  modifiedAt: string | null;
  topicList: Topic[];
}

export interface TMeetingFetchInfo {
  id: number;
  meetingTitle: string;
  startDate: string;
  expectedEndDate: string;
  createdAt: string;
  modifiedAt: string;
}
export type TMeetingFetchRes = TMeetingFetchInfo[];
