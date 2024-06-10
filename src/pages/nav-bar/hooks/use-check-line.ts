import { useEffect, useState } from 'react';

const useCheckLines = (elementRef: React.RefObject<HTMLElement>) => {
  const [lines, setLines] = useState<number>(1);

  useEffect(() => {
    const checkLines = () => {
      if (elementRef.current) {
        const lineHeight = parseInt(window.getComputedStyle(elementRef.current).lineHeight);
        const clientHeight = elementRef.current.offsetHeight;
        const lines = clientHeight / lineHeight;
        setLines(Math.round(lines));
      }
    };
    checkLines();
    window.addEventListener('resize', checkLines);
    return () => window.removeEventListener('resize', checkLines);
  }, [elementRef]);

  return lines;
};

export default useCheckLines;
