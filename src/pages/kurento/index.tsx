import React, { useState, useEffect } from 'react';
import Video from '@pages/kurento/components/video';
import kurentoUtils from 'kurento-utils';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
// import Modal from './Modal';

const Kurento = () => {
  const [ws, setWs] = useState(null);
  const [participants, setParticipants] = useState({});
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [roomName, setRoomName] = useState('테스트 Room');
  const [turnConfig, setTurnConfig] = useState({ url: '', username: '', credential: '' });

  // useEffect(() => {
  //   const ws = new WebSocket(`wss://${window.location.host}/signal`);
  //   ws.onopen = () => {
  //     initTurnServer();
  //     register();
  //     initDataChannel();
  //   };
  //   ws.onmessage = handleMessage;
  //   setWs(ws);

  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  // const initTurnServer = () => {
  //   fetch(`https://${window.location.host}/turnconfig`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setTurnConfig(data))
  //     .catch((error) => console.error('Error:', error));
  // };

  // const initDataChannel = () => {
  //   // Initialize your data channels here
  // };

  // const register = () => {
  //   const name = uuidv4();
  //   setName(name);
  //   const roomId = 'some-room-id'; // replace with actual room ID logic
  //   const roomName = 'some-room-name'; // replace with actual room name logic
  //   setRoomId(roomId);
  //   setRoomName(roomName);

  //   const message = {
  //     id: 'joinRoom',
  //     name,
  //     room: roomId,
  //   };
  //   sendMessageToServer(message);
  // };

  // const sendMessageToServer = (message) => {
  //   const jsonMessage = JSON.stringify(message);
  //   ws.send(jsonMessage);
  // };

  // const handleMessage = (message) => {
  //   const parsedMessage = JSON.parse(message.data);
  //   switch (parsedMessage.id) {
  //     case 'existingParticipants':
  //       onExistingParticipants(parsedMessage);
  //       break;
  //     case 'newParticipantArrived':
  //       onNewParticipant(parsedMessage);
  //       break;
  //     case 'participantLeft':
  //       onParticipantLeft(parsedMessage);
  //       break;
  //     case 'receiveVideoAnswer':
  //       receiveVideoResponse(parsedMessage);
  //       break;
  //     case 'iceCandidate':
  //       participants[parsedMessage.name].rtcPeer.addIceCandidate(parsedMessage.candidate, (error) => {
  //         if (error) {
  //           console.error('Error adding candidate: ' + error);
  //           return;
  //         }
  //       });
  //       break;
  //     case 'ConnectionFail':
  //       // Handle connection fail logic
  //       break;
  //     default:
  //       console.error('Unrecognized message', parsedMessage);
  //   }
  // };

  // // Implement other functions: onExistingParticipants, onNewParticipant, receiveVideoResponse, onParticipantLeft

  return (
    <div>
      <h1>Room {roomName}</h1>
      <S.Container>
        <Video />
        {/* <Video /> */}
      </S.Container>
      {/* <Modal /> */}
    </div>
  );
};

const S = {
  Container: styled.div`
    display: flex;
  `,
};

export default Kurento;
