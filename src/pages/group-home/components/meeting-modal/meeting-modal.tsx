import { useState } from 'react';
import Modal from '@components/modal/modal';
import { TMeetingRoom, TTopic } from '@constants/mockdata.type';
import styled from 'styled-components';
import MeetingForm from './meeting-form';

interface GroupModalProps {
  children: React.ReactNode;
  title: string;
  buttons: string[];
  data?: TMeetingRoom;
  topicData?: TTopic;
}

const MeetingModal = ({ children, title, buttons, data, topicData }: GroupModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen(true);
  };

  return (
    <button onClick={handleOpenClick}>
      {children}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <S.Title>{title}</S.Title>
        <MeetingForm data={data} topicData={topicData} />

        <S.ButtonContainer>
          <button>{buttons[0]}</button>
          <button onClick={() => setIsOpen(true)}>{buttons[1]}</button>
        </S.ButtonContainer>
      </Modal>
    </button>
  );
};

export default MeetingModal;

const S = {
  Container: styled.div``,

  Title: styled.p`
    font-size: 20px;
    font-weight: 600;
  `,

  ButtonContainer: styled.div`
    font-size: 20px;
    font-weight: 600;
    display: flex;
    gap: 10px;
    button {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.1);
      padding: 6px 10px;
      border-radius: 6px;
    }
  `,
};
