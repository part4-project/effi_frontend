import { CalendarValue } from '../types/type';

export const formatDate = (date: CalendarValue) => {
  if (date instanceof Date) {
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  throw Error('INVALID DATE');
};
