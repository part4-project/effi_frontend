import { useRef, useState } from 'react';
import SelectMedia from '@pages/kurento/components/select-media';
import Video from '@pages/kurento/components/video';
import styled from 'styled-components';
import { ICESERVERS } from './constants/ice-server';

const Kurento = () => {
  const [selectedCameraId, setSelectedCameraId] = useState(''); // 선택된 CameraId
  const [selectedAudioId, setSelectedAudioId] = useState(''); // 선택된 AudioId
  const [status, setStatus] = useState('Not started');

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const handleCameraIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCameraId(e.target.value);
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAudioId(e.target.value);
  };

  let localConnection: RTCPeerConnection;
  let remoteConnection: RTCPeerConnection;
  // let localStream;

  const startConnection = async () => {
    setStatus('연결 시도 중...');
    localConnection = new RTCPeerConnection({ iceServers: ICESERVERS });
    remoteConnection = new RTCPeerConnection({ iceServers: ICESERVERS });

    console.log('local');
    console.log(localConnection);
    console.log('remote');
    console.log(remoteConnection);

    localConnection.onicecandidate = (e) => {
      if (e.candidate) {
        remoteConnection.addIceCandidate(e.candidate);
      }
    };

    remoteConnection.onicecandidate = (e) => {
      if (e.candidate) {
        localConnection.addIceCandidate(e.candidate);
      }
    };

    // 원격 트랙 설정
    remoteConnection.ontrack = (e) => {
      console.log('Received remote track:', e.track);

      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = e.streams[0];
      }
    };

    localConnection
      .createOffer()
      .then((offer) => localConnection.setLocalDescription(offer))
      .then(() => remoteConnection.setRemoteDescription(localConnection.localDescription))
      .then(() => remoteConnection.createAnswer())
      .then((answer) => remoteConnection.setLocalDescription(answer))
      .then(() => localConnection.setRemoteDescription(remoteConnection.localDescription))
      .then(() => setStatus('Connected'))
      .catch(handleError);
  };

  const handleError = (error) => {
    console.error('Error: ', error);
    setStatus('Error');
  };

  return (
    <div>
      <h1>Room TEST</h1>
      <button onClick={startConnection}>Start Connection</button>
      <p>Status: {status}</p>
      <SelectMedia
        selectedCameraId={selectedCameraId}
        selectedAudioId={selectedAudioId}
        onCameraChange={handleCameraIdChange}
        onAudioChange={handleAudioChange}
      />
      <S.VideoContainer>
        <Video ref={localVideoRef} selectedCameraId={selectedCameraId} selectedAudioId={selectedAudioId} />
        <Video ref={remoteVideoRef} selectedCameraId={selectedCameraId} selectedAudioId={selectedAudioId} />
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
