import { useState, useEffect } from 'react';

const useForceQuitToastTimer = (targetDurationInSeconds: number) => {
  const [currElapsedSeconds, setCurrElapsedSeconds] = useState(targetDurationInSeconds);
  const [isDurationOver, setIsDurationOver] = useState(false);

  const resetTimer = () => {
    setCurrElapsedSeconds(targetDurationInSeconds);
    setIsDurationOver(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrElapsedSeconds((prevElapsedSeconds) => {
        const newElapsedSeconds = prevElapsedSeconds - 1;
        if (newElapsedSeconds <= 0) {
          clearInterval(timer);
          setIsDurationOver(true);
          return 0;
        }
        return newElapsedSeconds;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDurationInSeconds, isDurationOver]);

  return { currElapsedSeconds, isDurationOver, resetTimer };
};

export default useForceQuitToastTimer;
