import { useEffect } from 'react';

const useHistoryBackBlock = () => {
  const preventGoBack = () => {
    history.pushState(null, '', location.href);
  };

  // 뒤로가기 차단(1회)
  useEffect(() => {
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', preventGoBack);
    return () => {
      window.removeEventListener('popstate', preventGoBack);
    };
  }, []);
  return;
};

export default useHistoryBackBlock;
