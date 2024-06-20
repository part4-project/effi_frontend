import styled, { useTheme } from 'styled-components';
import { QUICK_BUTTONS } from '../constants';

interface QuickButtonProps {
  type: 'make-meeting' | 'user-info';
  onClick?: () => void;
}

const QuickButton = ({ onClick, type }: QuickButtonProps) => {
  const theme = useTheme();
  const buttonDetails = QUICK_BUTTONS[type];

  return (
    <S.QuickButton onClick={onClick}>
      <S.BackgroundImg src={theme[buttonDetails.backgroundImg]} alt="컨테이너" />
      <S.InnerBox>
        <S.InnerImg src={theme[buttonDetails.innerImg]} alt={buttonDetails.innerImgAlt} />
        <S.Label $type={type}>{buttonDetails.label}</S.Label>
      </S.InnerBox>
    </S.QuickButton>
  );
};

export default QuickButton;

const S = {
  QuickButton: styled.div`
    width: 220px;
    height: 138px;
    position: relative;
    cursor: pointer;
  `,
  BackgroundImg: styled.img`
    width: 100%;
    height: 100%;
  `,
  InnerBox: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -40%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  `,
  InnerImg: styled.img`
    width: 30px;
    height: 30px;
  `,
  Label: styled.p<{ $type: QuickButtonProps['type'] }>`
    width: 150px;
    color: ${({ $type, theme }) => ($type === 'make-meeting' ? theme.text01 : theme.text02)};
    text-align: center;
    font-size: 26px;
    font-weight: 900;
  `,
};
