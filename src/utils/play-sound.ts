function playSoundConfig(fileName: string, volume: number) {
  const audio = new Audio('/sound/' + fileName);
  audio.load();
  audio.volume = volume;
  audio.play();
}

const sounds = {
  enterRoom: { fileName: 'enter-room.mp3', volume: 0.5 },
  leaveRoom: { fileName: 'leave-room.mp3', volume: 1 },
  audioMute: { fileName: 'audio-mute.mp3', volume: 0.6 },
  audioUnmute: { fileName: 'audio-unmute.mp3', volume: 0.3 },
  toast: { fileName: 'toast.mp3', volume: 0.2 },
  toastError: { fileName: 'toast-error.mp3', volume: 0.2 },
};

export function playSound(soundName: keyof typeof sounds) {
  const { fileName, volume } = sounds[soundName];
  playSoundConfig(fileName, volume);
}
