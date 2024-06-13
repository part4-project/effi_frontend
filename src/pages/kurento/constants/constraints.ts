export const CONSTRAINTS = {
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
