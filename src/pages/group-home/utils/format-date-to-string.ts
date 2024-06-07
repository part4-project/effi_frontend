import { format } from 'date-fns';
export const formatDateToString = (date: Date | null) => {
  if (date instanceof Date) {
    return format(date, 'yyyy-MM-dd a hh:mm');
  }
  throw new Error('전달된 인수가 Date 객체가 아닙니다.');
};
