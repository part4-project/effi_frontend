import { createGlobalStyle } from 'styled-components';
import colors from './colors';
import myReset from './myReset';

const GlobalStyle = createGlobalStyle`
    ${myReset}
    ${colors}
`;

export default GlobalStyle;
