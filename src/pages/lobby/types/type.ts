type CalendarValuePiece = Date | null;
export type CalendarValue = CalendarValuePiece | [CalendarValuePiece, CalendarValuePiece];

export interface ScheduleList {
  id: number;
  group: string;
  start_date: string;
  expected_end_date: string;
  title: string;
}
