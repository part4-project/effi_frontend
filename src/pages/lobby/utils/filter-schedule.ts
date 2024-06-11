import { ScheduleList } from '../types/type';

export const filterSchedule = (scheduleList: ScheduleList[], targetDate: string) => {
  return scheduleList.filter((s) => s.start_date === targetDate);
};
