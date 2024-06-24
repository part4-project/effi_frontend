import { useDarkModeStore } from '@stores/dark-mode';
import styled from 'styled-components';

const DarkModeButton = () => {
  const { isDarkMode, onDarkMode, onLightMode } = useDarkModeStore();

  const handleDarkModeClick = () => {
    isDarkMode ? onLightMode() : onDarkMode();
  };

  return (
    <S.DarkModeButton>
      <input type="checkbox" checked={isDarkMode} onChange={handleDarkModeClick} id="darkModeToggle" hidden />
      <S.Label htmlFor="darkModeToggle" $isDarkMode={isDarkMode} />
    </S.DarkModeButton>
  );
};

export default DarkModeButton;

const S = {
  DarkModeButton: styled.div`
    position: relative;
    width: 60px;
    height: 30px;
  `,
  Label: styled.label<{ $isDarkMode: boolean }>`
    position: absolute;
    cursor: pointer;
    background-color: ${({ $isDarkMode, theme }) => ($isDarkMode ? theme.theme06 : theme.theme03)};
    border-radius: 30px;
    inset: 0;
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: url('${(props) => props.theme.themeBtnImg}');
      background-repeat: no-repeat;
      background-size: cover;
      transition: transform 0.3s;
      transform: ${({ $isDarkMode }) => ($isDarkMode ? 'translate3d(25px, -50%, 0)' : 'translate3d(0, -50%, 0)')};
    }
  `,
};
