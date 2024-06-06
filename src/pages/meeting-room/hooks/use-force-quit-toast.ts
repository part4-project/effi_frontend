import { useCallback, useState } from 'react';

const useForceQuitToast = () => {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isToastAnimClose, setIsToastAnimClose] = useState(false);

  const handleToastChange = useCallback((state: boolean) => {
    setIsToastOpen(state);
  }, []);

  const handleToastClose = useCallback(() => {
    setIsToastAnimClose(true);
    setTimeout(() => {
      setIsToastAnimClose(false);
      setIsToastOpen(false);
    }, 500);
  }, []);

  return { isToastOpen, handleToastChange, isToastAnimClose, handleToastClose };
};

export default useForceQuitToast;
