//Date 객체 기반 날짜
export const DateSetUp = (initialDate: string) => {
  const array: RegExpMatchArray | null = initialDate.match(/(\d{2})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/);
  if (!array) {
    throw new Error('유효한 날짜 형식이 아닙니다.');
  }

  const year = parseInt(`20${array[1]}`, 10);
  const month = parseInt(array[2], 10) - 1;
  const day = parseInt(array[3], 10);
  const hour = parseInt(array[4], 10);
  const minute = parseInt(array[5], 10);

  return new Date(year, month, day, hour, minute);
};

//mockData 객체 기반 날짜
export const DateSetUpMock = (initialDate: string) => {
  const array: RegExpMatchArray | null = initialDate.match(/(\d+)\. (\d+)\. (\d+)\. (오전|오후) (\d+):(\d+)/);
  if (!array) {
    throw new Error('유효한 날짜 형식이 아닙니다.');
  }

  const year = parseInt(array[1], 10);
  const month = parseInt(array[2], 10) - 1;
  const day = parseInt(array[3], 10);
  let hour = parseInt(array[5], 10);
  const minute = parseInt(array[6], 10);
  const period = array[4];

  if (period === '오후' && hour < 12) {
    hour += 12;
  } else if (period === '오전' && hour === 12) {
    hour = 0;
  }

  return new Date(year, month, day, hour, minute);
};

//처음과 끝 사이의 시간 구하기
export const TimeCaculate = (startDate: Date, endDate: Date) => {
  if (endDate.getTime() - startDate.getTime() <= 0) {
    return { hour: 0, minute: 0, second: 0 };
  }

  const totalSecond = (endDate.getTime() - startDate.getTime()) / 1000;
  const hour = Math.floor(totalSecond / 3600);
  const minute = Math.floor((totalSecond % 3600) / 60);
  const second = Math.floor(totalSecond % 60);

  return { hour, minute, second };
};

//시간 문자열
export const TimeString = ({ hour, minute, second }: { hour: number; minute: number; second: number }) => {
  return `${hour ? `${hour}시간` : ''} ${minute ? `${minute}분` : ''} ${second ? `${second}초` : ''}`;
};
