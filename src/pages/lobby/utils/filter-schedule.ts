import { TCalendarMeetingFetchInfo } from '@api/meeting/meeting-request.type';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { formatCalendarDate } from './format-date';

export const filterSchedule = (targetDate: Date | null, meetingList?: TCalendarMeetingFetchInfo[]) => {
  if (meetingList && targetDate instanceof Date) {
    const filterdList = meetingList.filter(
      (el) => formatCalendarDate(el.startDate) === format(targetDate, 'yyyy년 M월 d일 EEEE', { locale: ko }),
    );

    return filterdList;
  }
  return [];
};
