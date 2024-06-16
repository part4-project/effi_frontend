import { useEffect, useState } from 'react';
import styled from 'styled-components';
import WebSocketService from './utils/kurento-service';

const KurentoService = () => {
  const [title, setTitle] = useState('EFFI 채팅 테스트');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [roomId, setRoomId] = useState(1); // roomId 임시
  const [userId, setUserId] = useState(123); //  userId 임시
  const [meetingId, setMeetingId] = useState(456); // meetingId 임시

  useEffect(() => {
    WebSocketService.connect((msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      WebSocketService.disconnect();
    };
  }, []);
  console.log(messages);

  const handleEnter = () => {
    setTitle(`${roomId}방 접속`);
    console.log(document.getElementById('roomTitle'));
    document.getElementById('enterBtn').style.visibility = 'hidden';
    document.getElementById('exitBtn').style.visibility = 'visible';
    document.getElementById('messages').style.visibility = 'visible';

    const sessionDto = { meetingId, userId };
    WebSocketService.sendMessage(`/signal/pub/meeting/${roomId}/enter`, sessionDto);
  };

  const handleSendMessage = () => {
    const sessionDto = { meetingId, userId, message };
    WebSocketService.sendMessage(`/signal/pub/meeting/${roomId}/chat`, sessionDto);
    setMessage('');
  };

  const handleLeave = () => {
    setTitle(`EFFI 채팅 테스트`);
    document.getElementById('enterBtn').style.visibility = 'visible';
    document.getElementById('exitBtn').style.visibility = 'hidden';
    document.getElementById('messages').style.visibility = 'hidden';

    const sessionDto = { meetingId, userId };
    WebSocketService.sendMessage(`/signal/pub/meeting/${roomId}/leave`, sessionDto);
  };

  return (
    <S.Container>
      <h1>{title}</h1>
      <S.RoomButtonContainer>
        <S.EnterButton id="enterBtn" onClick={handleEnter}>
          방 입장
        </S.EnterButton>
        <S.ExitButton id="exitBtn" onClick={handleLeave}>
          방 나가기
        </S.ExitButton>
      </S.RoomButtonContainer>
      <div>
        <S.MessageInput
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <S.SendButton onClick={handleSendMessage}>전송</S.SendButton>
      </div>
      <S.MessagesContainer id="messages">
        <h3>메시지:</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg.message}</li>
          ))}
        </ul>
      </S.MessagesContainer>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    padding: 100px;
  `,

  RoomButtonContainer: styled.div`
    display: flex;
    gap: 10px;
    button {
      padding: 10px 15px;
      border-radius: 6px;
    }
  `,

  EnterButton: styled.button`
    background-color: var(--blue01);
    color: var(--white);
  `,
  ExitButton: styled.button`
    background-color: var(--red01);
    color: var(--white);
    visibility: hidden;
  `,

  MessageInput: styled.input`
    padding: 10px;
    border: 1px solid var(--gray02);
    margin: 20px 0;
  `,

  SendButton: styled.button`
    background-color: var(--blue02);
    padding: 11px;
  `,

  MessagesContainer: styled.div`
    visibility: hidden;
  `,
};

export default KurentoService;
