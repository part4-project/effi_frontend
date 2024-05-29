import Chatting from './components/chatting';
import RoomButton from './components/room-button';
import RoomCamera from './components/room-camera';
import Timer from './components/timer';
import Topics from './components/topics';

const MeetingRoom = () => {
  return (
    <div>
      <div className="left-section">
        <div className="header">
          <Timer />
        </div>
        <div className="room-camera-container">
          <RoomCamera />
        </div>
        <div className="footer">
          <div className="room-button-container">
            <RoomButton />
          </div>
        </div>
      </div>
      <div className="right-section">
        <Topics />
        <Chatting />
      </div>
    </div>
  );
};

export default MeetingRoom;
