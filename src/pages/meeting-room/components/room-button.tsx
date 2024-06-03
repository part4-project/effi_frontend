import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RoomButtonType } from '../types';

interface RoomButtonProps extends RoomButtonType {}

const RoomButton = ({ type, initialImg, changedImg }: RoomButtonProps) => {
  const navigate = useNavigate();
  const [btnImg, setBtnImg] = useState(initialImg);

  const HANDLE_BUTTON_CLICKS = useMemo(
    () => ({
      카메라: () => {
        setBtnImg((prevImg) => (prevImg === initialImg ? changedImg! : initialImg));
      },
      마이크: () => {
        setBtnImg((prevImg) => (prevImg === initialImg ? changedImg! : initialImg));
      },
      나가기: () => {
        navigate('/group-home');
      },
    }),
    [initialImg, navigate, changedImg],
  );

  return (
    <S.RoomButton onClick={HANDLE_BUTTON_CLICKS[type]}>
      <img src={btnImg} alt="버튼 이미지" />
    </S.RoomButton>
  );
};

export default RoomButton;

const S = {
  RoomButton: styled.button`
    width: 80px;
    height: 80px;
    background: #4d4f4e;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
    }
  `,
};
