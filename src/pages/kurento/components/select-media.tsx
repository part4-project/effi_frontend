/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

interface SelectMediaProps {
  selectedCameraId: string;
  selectedAudioId: string;
  onCameraChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onAudioChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectMedia = ({ selectedCameraId, selectedAudioId, onCameraChange, onAudioChange }: SelectMediaProps) => {
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]); // 카메라 목록 상태
  const [audios, setAudios] = useState<MediaDeviceInfo[]>([]); // 오디오 목록 상태

  useEffect(() => {
    getCameras();
  }, []);

  // 비동기 함수로 카메라 목록 가져오기
  const getCameras = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === 'videoinput');
      const audios = devices.filter((device) => device.kind === 'audioinput');
      setCameras(cameras);
      setAudios(audios);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <select value={selectedCameraId} onChange={onCameraChange}>
        <option value="">카메라 선택</option>
        {cameras.map((camera) => (
          <option key={camera.deviceId} value={camera.deviceId}>
            {camera.label}
          </option>
        ))}
      </select>

      <select value={selectedAudioId} onChange={onAudioChange}>
        <option value="">마이크 선택</option>
        {audios.map((audio) => (
          <option key={audio.deviceId} value={audio.deviceId}>
            {audio.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectMedia;
