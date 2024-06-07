import { useRef, useState } from 'react';
import useOutsideClick from './use-outside-click';

const useDropdown = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  useOutsideClick(ref, handleDropdownClose);

  return { ref, isDropdownOpen, handleDropdownClick, handleDropdownClose };
};

export default useDropdown;
