import { useState, useEffect } from 'react';
import { formatDuration, intervalToDuration } from 'date-fns';
import { ko } from 'date-fns/locale';

const useTimer = (targetDurationInSeconds: number) => {
  const [currElapsedSeconds, setCurrElapsedSeconds] = useState(0);
  const [isDurationOver, setIsDurationOver] = useState(false);

  const resetTimer = () => {
    setCurrElapsedSeconds(0);
    setIsDurationOver(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrElapsedSeconds((prevElapsedSeconds) => {
        const newElapsedSeconds = prevElapsedSeconds + 1;
        if (!isDurationOver && newElapsedSeconds >= targetDurationInSeconds) {
          setIsDurationOver(true);
          return newElapsedSeconds - targetDurationInSeconds;
        }
        return newElapsedSeconds;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDurationInSeconds, isDurationOver]);

  const formatDurationFromSeconds = (seconds: number) => {
    const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
    return formatDuration(duration, {
      format: ['hours', 'minutes', 'seconds'],
      zero: true,
      delimiter: ' ',
      locale: ko,
    });
  };

  return { currElapsedSeconds, formatDurationFromSeconds, isDurationOver, resetTimer };
};

export default useTimer;
