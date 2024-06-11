import { format, parse } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatDate = (date: string) => {
  const parsedDate = parse(date, 'yy-MM-dd HH:mm', new Date());
  return format(parsedDate, 'yyyy년 M월 d일 EEEE', { locale: ko });
};
