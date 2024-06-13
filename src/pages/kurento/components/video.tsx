import { useEffect, useRef, useState } from 'react';
import defaultProfile from '@assets/default-profile.jpg';
import styled from 'styled-components';
import { CONSTRAINTS } from '../constants/constraints';

interface VideoProps {
  selectedCameraId: string;
  selectedAudioId: string;
}

const Video = ({ selectedCameraId, selectedAudioId }: VideoProps) => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const [videoCount, setVideoCount] = useState(0);

  useEffect(() => {
    console.log('camera', selectedCameraId);
    console.log('audio', selectedAudioId);
    const getMediaStream = async () => {
      try {
        const videoConstraints = selectedCameraId
          ? { ...CONSTRAINTS.video, deviceId: { exact: selectedCameraId } }
          : CONSTRAINTS.video;

        const audioConstraints = selectedAudioId
          ? { ...CONSTRAINTS.audio, deviceId: { exact: selectedAudioId } }
          : CONSTRAINTS.audio;

        const newConstraints = {
          video: videoConstraints,
          audio: audioConstraints,
        };
        const stream = await navigator.mediaDevices.getUserMedia(newConstraints);
        setVideoCount(stream.getVideoTracks().length);
        console.log(stream);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        if (audioRef.current) {
          audioRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };

    getMediaStream();
  }, [videoCount, selectedCameraId, selectedAudioId]);

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
