import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Video = () => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [constraints, setConstraints] = useState({
    audio: {
      autoGainControl: true,
      channelCount: 2,
      echoCancellation: true,
      latency: 0,
      noiseSuppression: true,
      sampleRate: 48000,
      sampleSize: 16,
    },

    video: {
      width: 400,
      height: 300,
      maxFrameRate: 50,
      minFrameRate: 40,
    },
  });

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        if (audioRef.current) {
          audioRef.current.srcObject = stream;
          console.log('Audio stream set to audioRef:', audioRef.current.srcObject);
        }
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };

    getMediaStream();
    console.log(audioRef.current.volume);
  }, [constraints]);

  const handleMute = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0;
      console.log('Mute button clicked, volume:', audioRef.current.volume);
    } else {
      console.log('audioRef.current is null');
    }
  };

  return (
    <S.Container>
      <video ref={videoRef} autoPlay />
      <audio ref={audioRef} autoPlay />
      <button onClick={handleMute}>음소거</button>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    /* display: flex; */
  `,
  StyledVideo: styled.video`
    border: 1px solid red;
  `,
};

export default Video;
