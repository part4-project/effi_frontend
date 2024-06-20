import { useState } from 'react';

const useInputForm = (submitCb: () => void) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue) {
      submitCb();
      setInputValue('');
    }
  };

  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  return { inputValue, handleSubmit, handleInputValueChange };
};

export default useInputForm;
