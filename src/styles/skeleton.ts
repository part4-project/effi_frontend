import { keyframes, css } from 'styled-components';

const loading = keyframes`
  0% {
    transform: translateX(0);
  }
  50%,
  100% {
    transform: translateX(460px);
  }
`;

export const skeleton = css`
  position: relative;
  background: ${(props) => props.theme.skeleton};
  overflow: hidden;
`;

export const skeletonAnimation = css`
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 100%;
  background: linear-gradient(
    to right,
    ${(props) => props.theme.skeleton},
    ${(props) => props.theme.skeletonAnimation},
    ${(props) => props.theme.skeleton}
  );
  animation: ${loading} 2s infinite linear;
`;
