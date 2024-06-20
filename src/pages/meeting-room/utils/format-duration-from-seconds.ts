import { formatDuration, intervalToDuration } from 'date-fns';
import { ko } from 'date-fns/locale';

type TFormat = 'api' | 'component';

const zeroPad = (num?: number) => String(num).padStart(2, '0');

export const formatDurationFromSeconds = (seconds: number, type: TFormat = 'component') => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

  if (type === 'api')
    return formatDuration(duration, {
      format: ['hours', 'minutes', 'seconds'],
      zero: true,
      delimiter: ' ',
      locale: ko,
    });

  const formatted = `${duration.hours ? `${zeroPad(duration.hours)}:` : ''}${duration.minutes ? `${zeroPad(duration.minutes)}:` : '00:'}${
    duration.seconds ? zeroPad(duration.seconds) : '00'
  }`;

  return formatted;
};
