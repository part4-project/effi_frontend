import { useEffect, useRef, useState } from 'react';
import defaultProfile from '@assets/default-profile.jpg';
import styled from 'styled-components';

const CONSTRAINTS = {
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
};

const Video = () => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [videoCount, setVideoCount] = useState(0);

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
        // 마이크, 카메라 리스트 가져오기
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter((device) => device.kind === 'videoinput');
        const audios = devices.filter((device) => device.kind === 'audioinput');

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        if (audioRef.current) {
          audioRef.current.srcObject = stream;
        }

        setVideoCount(stream.getVideoTracks().length);

        console.log(cameras, audios);
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };

    getMediaStream();
  }, [videoCount]);

  return (
    <>
      {videoCount > 0 ? (
        <S.Container>
          <S.StyledVideo ref={videoRef} autoPlay playsInline muted />
          <audio ref={audioRef} autoPlay controls />
        </S.Container>
      ) : (
        <S.DummyContainer>
          <S.DummyVideo>
            <img src={defaultProfile} />
          </S.DummyVideo>

          <audio ref={audioRef} autoPlay controls />
        </S.DummyContainer>
      )}
    </>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    z-index: 9999;
  `,

  StyledVideo: styled.video`
    border-radius: 10px;
  `,

  DummyContainer: styled.div``,

  DummyVideo: styled.div`
    aspect-ratio: 446/334.4;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50px;
    }
  `,
};

export default Video;
