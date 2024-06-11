import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { formatDate } from './format-date';
import { ScheduleList } from '../types/type';

export const filterSchedule = (scheduleList: ScheduleList[], targetDate: Date | null) => {
  if (targetDate instanceof Date) {
    const filterdList = scheduleList.filter(
      (el) => formatDate(el.start_date) === format(targetDate, 'yyyy년 M월 d일 EEEE', { locale: ko }),
    );

    return filterdList;
  }
  return [];
};
