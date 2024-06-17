import { useDarkModeStore } from '@stores/dark-mode';
import styled from 'styled-components';

const DarkModeButton = () => {
  const { isDarkMode, modeName, onDarkMode, onLightMode } = useDarkModeStore();

  const handleDarkModeClick = () => {
    isDarkMode ? onLightMode() : onDarkMode();
  };

  return (
    <S.DarkModeButton onClick={handleDarkModeClick}>
      <p>{modeName}</p>
    </S.DarkModeButton>
  );
};

export default DarkModeButton;

const S = {
  DarkModeButton: styled.button`
    background: ${(props) => props.theme.button01};
    padding: 6px 12px;
    width: 100px;
    border-radius: 8px;
    color: ${(props) => props.theme.theme01};
    font-weight: 600;
  `,
};
