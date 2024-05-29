import { useEffect } from 'react';

const useCloseModal = (isOpen: boolean, onClose: () => void, modalRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    //외부 영역 클릭시
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    //esc 키 누를시
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose, modalRef]);
};

export default useCloseModal;
