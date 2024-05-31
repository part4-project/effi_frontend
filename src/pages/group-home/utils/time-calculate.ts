export const DateSetUp = (initialDate: string) => {
  const [date, time] = initialDate.split(' ');
  const [day, month, year] = date.split('-');
  return new Date(`20${year}-${month}-${day}T${time}:00`);
};

export const TimeCaculate = (startDate: Date, endDate: Date) => {
  if (endDate.getTime() - startDate.getTime() <= 0) {
    return '';
  }
  const totalSecond = (endDate.getTime() - startDate.getTime()) / 1000;
  const hour = Math.floor(totalSecond / 3600);
  const minute = Math.floor((totalSecond % 3600) / 60);
  const second = Math.floor(totalSecond % 60);
  const time = `${hour ? `${hour}시간` : ''} ${minute ? `${minute}분` : ''} ${second ? `${second}초` : ''}`;

  return time;
};
