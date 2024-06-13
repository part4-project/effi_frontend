import { useState } from 'react';
import SelectMedia from '@pages/kurento/components/select-media';
import Video from '@pages/kurento/components/video';
import styled from 'styled-components';

const Kurento = () => {
  const [selectedCameraId, setSelectedCameraId] = useState(''); // 선택된 CameraId
  const [selectedAudioId, setSelectedAudioId] = useState(''); // 선택된 AudioId

  const handleCameraIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCameraId(e.target.value);
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAudioId(e.target.value);
  };

  return (
    <div>
      <h1>Room TEST</h1>
      <SelectMedia
        selectedCameraId={selectedCameraId}
        selectedAudioId={selectedAudioId}
        onCameraChange={handleCameraIdChange}
        onAudioChange={handleAudioChange}
      />
      <S.VideoContainer>
        <Video selectedCameraId={selectedCameraId} selectedAudioId={selectedAudioId} />
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
