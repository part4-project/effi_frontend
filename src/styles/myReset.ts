import { css } from 'styled-components';

const myReset = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: inherit;
  }

  html,
  body {
    overflow-x: hidden;
    font-family: 'Pretendard', Helvetica, '맑은 고딕', 'malgun gothic', 'Apple SD Gothic Neo', 'Apple SD 산돌고딕 Neo',
      'Microsoft NeoGothic', 'Droid sans', sans-serif;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  body {
    font-weight: 400;
    position: relative;
  }

  ol,
  ul,
  li {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    border: 0;
    background: none;
    cursor: pointer;
  }

  input {
    outline: 0;
    border: 0;
  }

  fieldset {
    border: 0;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

export default myReset;
