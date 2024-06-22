import { format } from 'date-fns';

export const formatDateToString = (date: Date | null) => {
  if (date instanceof Date) {
    return format(date, 'yyyy-MM-dd a hh:mm');
  }
  throw new Error('전달된 인수가 Date 객체가 아닙니다.');
};

export const formatDateToISOStringWithOffset = (date: Date | null) => {
  if (!date) return '';
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - timezoneOffset);
  const isoString = localDate.toISOString().slice(0, -1);

  return isoString;
};
