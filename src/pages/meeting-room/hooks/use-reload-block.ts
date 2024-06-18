import { useEffect } from 'react';

const useReloadBlock = () => {
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ''; // deprecated되었지만 Chrome에서 동작하려면 필요
  };

  useEffect(() => {
    window.addEventListener('beforeunload', preventClose);
    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);
  return;
};

export default useReloadBlock;
