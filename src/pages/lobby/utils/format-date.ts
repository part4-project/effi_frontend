import { format, parse, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatDate = (date: string) => {
  const parsedDate = parse(date, 'yy-MM-dd HH:mm', new Date());
  return format(parsedDate, 'yyyy년 M월 d일 EEEE', { locale: ko });
};

export const formatCalendarDate = (dateStr: string) => {
  const date = parseISO(dateStr);
  return format(date, 'yyyy년 M월 d일 EEEE', { locale: ko });
};

export const formatCalenderListTime = (dateStr: string) => {
  const date = parseISO(dateStr);
  return format(date, 'HH:mm');
};
