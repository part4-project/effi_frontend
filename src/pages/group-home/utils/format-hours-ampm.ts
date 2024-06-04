import { parse, format } from 'date-fns';

export const formatHoursAmPm = (dateString: string) => {
  const parsedDate = parse(dateString, 'yyyy-MM-dd HH:mm:ss', new Date(dateString));
  const formattedDateString = format(parsedDate, 'p');
  const [time, ampm] = formattedDateString.split(' ');

  return `${ampm === 'AM' ? '오전' : '오후'} ${time}`;
};
