import { useState, useEffect } from 'react';

const useCheckMinuteTime = () => {
  const currentTime = new Date();
  const [checkMinuteTime, setCheckMinuteTime] = useState(currentTime);

  const updateCheckMinuteTime = () => {
    const updateCurrentTime = new Date();
    setCheckMinuteTime(updateCurrentTime);
  };

  useEffect(() => {
    const nextMinuteTime = (60 - currentTime.getSeconds()) * 1000 - currentTime.getMilliseconds();
    //렌더링 후 최초 다음 n분 0초
    const initialTimeout = setTimeout(() => {
      updateCheckMinuteTime();
      //그 후 1분마다 실행
      const interval = setInterval(updateCheckMinuteTime, 60000);
      return () => clearInterval(interval);
    }, nextMinuteTime);

    return () => {
      clearTimeout(initialTimeout);
    };
  }, []);

  return checkMinuteTime;
};

export default useCheckMinuteTime;
