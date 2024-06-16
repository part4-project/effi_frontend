import { useEffect } from 'react';
import styled from 'styled-components';
import WebSocketService from './utils/kurento-service';

const KurentoService = () => {
  useEffect(() => {
    WebSocketService.connect();

    return () => {
      WebSocketService.disconnect();
    };
  }, []);

  return (
    <S.Container>
      <h1>WS 테스트</h1>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    padding: 100px;
  `,
};

export default KurentoService;
