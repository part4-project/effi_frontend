const name = null;
const roomId = null;
const roomName = null;

function register() {
  const name = $('#uuid').val();
  const roomId = $('#roomId').val();
  roomName = $('#roomName').val();

  document.getElementById('room-header').innerText = 'ROOM ' + roomName;
  document.getElementById('room').style.display = 'block';

  const message = {
    id: 'joinRoom',
    name: $('#uuid').val(),
    room: roomId,
  };
  // sendMessageToServer(message);
}
