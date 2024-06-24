// request
// response
export interface TReportTopic {
  topicName: string;
  isCompleted: boolean;
  orderIndex: number;
}
export interface TReportChatting {
  userId: number;
  roomId: number;
  message: string;
  timeStamp: string;
}
export interface TReportParticipant {
  userId: number;
  roomId: number;
  profileImageUrl: string;
}
export interface TReportInfo {
  groupId: number;
  meetingId: number;
  startDate: string;
  expectedEndDate: string;
  actualEndDate: string;
  topicList: TReportTopic[];
  chattingList: TReportChatting[];
  participantList: TReportParticipant[];
}
export type TReportList = TReportInfo[];
