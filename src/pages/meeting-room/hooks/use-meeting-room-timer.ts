import { useState, useEffect } from 'react';
import { parse } from 'date-fns';
import { calculateDurationInSeconds } from '../utils/calculate-duration-in-seconds';

const useMeetingRoomTimer = (startDateStr: string, endDateStr: string) => {
  const [currElapsedSeconds, setCurrElapsedSeconds] = useState(0);
  const [isDurationOver, setIsDurationOver] = useState(false);
  const targetDuration = calculateDurationInSeconds(startDateStr, endDateStr);

  useEffect(() => {
    const startDate = parse(startDateStr.replace(/오전|오후/g, ''), 'yyyy. M. d.  HH:mm', new Date());
    const endDate = parse(endDateStr.replace(/오전|오후/g, ''), 'yyyy. M. d.  HH:mm', new Date());

    const timer = setInterval(() => {
      const now = new Date();
      const elapsedSeconds = Math.floor((now.getTime() - startDate.getTime()) / 1000);
      if (now >= endDate) {
        if (!isDurationOver) setIsDurationOver(true);
        setCurrElapsedSeconds(elapsedSeconds - targetDuration);
      } else {
        setCurrElapsedSeconds(elapsedSeconds);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startDateStr, endDateStr, targetDuration, isDurationOver]);

  return { currElapsedSeconds, targetDuration, isDurationOver };
};

export default useMeetingRoomTimer;
