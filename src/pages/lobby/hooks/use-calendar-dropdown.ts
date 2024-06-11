import { useState } from 'react';

export const useCalendarDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownOpen = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  return { isDropdownOpen, handleDropdownOpen, handleDropdownClose };
};
