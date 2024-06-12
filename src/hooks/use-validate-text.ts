import { ChangeEvent, useEffect, useState } from 'react';

/*
length: 글자 수 제한
space: 띄어쓰기 제한
*/
const useValidateText = (minLength: number, maxLength: number, space: boolean = true) => {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateText = (text: string) => {
    const validators = [
      {
        validate: () => !text,
        message: '내용을 입력해주세요.',
      },
      {
        validate: () => text.length < minLength,
        message: `내용은 ${minLength}자 이상 입력해주세요.`,
      },
      {
        validate: () => text.length > maxLength,
        message: `내용은 ${maxLength}자 이하여야 합니다.`,
      },
      ...(!space
        ? [
            {
              validate: () => /\s/.test(text),
              message: '띄어쓰기를 사용할 수 없습니다.',
            },
          ]
        : []),
    ];

    const error = validators.find(({ validate }) => validate());

    return error ? error.message : '';
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    // 유효성 검사 실행
    setErrorMessage(validateText(inputValue));
  }, [inputValue]);

  return {
    inputValue,
    setInputValue,
    errorMessage,
    handleInputChange,
  };
};

export default useValidateText;
