const PARTICIPANT_MAIN_CLASS = 'participant main';
const PARTICIPANT_CLASS = 'participant';

export function createParticipant(name) {
  const container = document.createElement('div');
  const isMainParticipant = function () {
    return document.getElementsByClassName(PARTICIPANT_MAIN_CLASS).length === 0;
  };

  container.className = isMainParticipant() ? PARTICIPANT_MAIN_CLASS : PARTICIPANT_CLASS;
  container.id = name;

  const span = document.createElement('span');
  const video = document.createElement('video');
  const audio = document.createElement('audio');

  container.appendChild(video);
  container.appendChild(span);
  container.appendChild(audio);

  span.appendChild(document.createTextNode(name));

  video.id = 'video-' + name;
  video.autoplay = true;
  video.controls = true;
  audio.autoplay = true;

  // document.getElementById('participants').appendChild(container);

  let localStream = null;

  function setLocalStream(stream) {
    localStream = stream;
  }

  function getLocalStream() {
    return localStream;
  }

  function getElement() {
    return container;
  }

  function getVideoElement() {
    return video;
  }

  function getAudioElement() {
    return audio;
  }

  function dispose() {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }

  function setVolume(volumeLevel) {
    audio.volume = volumeLevel;
    video.volume = volumeLevel;
  }

  function getLocalUser() {
    const mainParticipant = document.getElementsByClassName(PARTICIPANT_MAIN_CLASS)[0];
    return mainParticipant ? mainParticipant.id : null;
  }

  return {
    name,
    setLocalStream,
    getLocalStream,
    getElement,
    getVideoElement,
    getAudioElement,
    dispose,
    setVolume,
    getLocalUser,
  };
}

function register() {
  const name = '경수';
  const roomId = 'askdjadkjahskjda';
  const roomName = '경수의 방';

  document.getElementById('room-header').innerText = 'ROOM ' + roomName;
  document.getElementById('room').style.display = 'block';

  const message = {
    id: 'joinRoom',
    name: $('#uuid').val(),
    room: roomId,
  };
  sendMessageToServer(message);
}
