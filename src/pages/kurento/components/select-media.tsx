import { useState, useEffect } from 'react';

const SelectMedia = () => {
  const [cameras, setCameras] = useState([]); // 카메라 목록 상태
  const [audios, setAudios] = useState([]); // 오디오 목록 상태
  const [selectedCamera, setSelectedCamera] = useState(''); // 선택된 카메라 상태
  const [selectedAudios, setSelectedAudios] = useState(''); // 선택된 오디오 상태

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
      console.log(error);
    }
  };

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
  };

  const handleAudioChange = (event) => {
    setSelectedAudios(event.target.value);
  };

  return (
    <div>
      <select value={selectedCamera} onChange={handleCameraChange}>
        <option value="">카메라 선택</option>
        {cameras.map((camera) => (
          <option key={camera.deviceId} value={camera.deviceId}>
            {camera.label}
          </option>
        ))}
      </select>

      <select value={selectedAudios} onChange={handleAudioChange}>
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
