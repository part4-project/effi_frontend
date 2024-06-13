import { useState } from 'react';
import SelectMedia from '@pages/kurento/components/select-media';
import Video from '@pages/kurento/components/video';
import styled from 'styled-components';

const Kurento = () => {
  const [roomName, setRoomName] = useState('테스트 room');

  return (
    <div>
      <h1>Room {roomName}</h1>
      <SelectMedia />
      <S.VideoContainer>
        <Video />
        <Video />
        <Video />
      </S.VideoContainer>
    </div>
  );
};

const S = {
  VideoContainer: styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  `,
};

export default Kurento;
