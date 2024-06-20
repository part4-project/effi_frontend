import { useState, useEffect, RefObject, useCallback } from 'react';

// ref의 width, height, top, left 값 가져오는 커스텀 훅
const useRefSize = (divRef: RefObject<HTMLDivElement>) => {
  const [refSize, setRefSize] = useState({ width: 0, height: 0, top: 0, left: 0 });

  const handleResize = useCallback(() => {
    if (divRef.current) {
      const { width, height, top, left } = divRef.current.getBoundingClientRect();
      setRefSize({ width, height, top, left });
    }
  }, [divRef]);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;
    let animationFrameId: number | null = null;

    const resizeHandler = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(handleResize);
    };

    resizeObserver = new ResizeObserver(resizeHandler);
    if (divRef.current) {
      resizeObserver.observe(divRef.current);
    }

    window.addEventListener('resize', resizeHandler);
    window.addEventListener('scroll', resizeHandler);

    handleResize();

    return () => {
      if (resizeObserver && divRef.current) {
        resizeObserver.unobserve(divRef.current);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('scroll', resizeHandler);
    };
  }, [handleResize, divRef]);

  return {
    handleResize,
    refWidth: refSize.width,
    refHeight: refSize.height,
    refTop: refSize.top,
    refLeft: refSize.left,
  };
};

export default useRefSize;
