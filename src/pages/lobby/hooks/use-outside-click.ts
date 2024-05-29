import { useEffect, RefObject } from 'react';

type RefType = RefObject<HTMLElement>;

const useOutsideClick = (ref: RefType, callback: () => void) => {
  useEffect(() => {
    const handleOutSectionClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (ref.current && !ref.current.contains(target)) callback();
    };
    document.addEventListener('click', handleOutSectionClick);
    return () => document.removeEventListener('click', handleOutSectionClick);
  }, [ref, callback]);
};

export default useOutsideClick;
