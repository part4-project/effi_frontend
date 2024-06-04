import { useState } from 'react';
import ChattingBox from '@components/meeting/chatting-box';
import TopicList from '@components/meeting/topic-list';
import Modal from '@components/modal/modal';
import ModalHeader from '@components/modal/modal-header';
import styled from 'styled-components';
import ReportMember from './report-member';
import ReportTime from './report-time';

interface GroupModalProps {
  children: React.ReactNode;
}

const ReportModal = ({ children }: GroupModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleOpenButtonClick = () => {
    setIsOpen(true);
  };

  const handleCloseButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <button onClick={handleOpenButtonClick}>
      {children}
      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalHeader headerTitle="회의주제" onClose={handleCloseButtonClick} />
        <S.ReportContent>
          <TopicList />
          <ReportMember />
          <ReportTime />
          <ChattingBox />
        </S.ReportContent>
      </Modal>
    </button>
  );
};

export default ReportModal;

const S = {
  ReportContent: styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      'topic chat'
      'member chat'
      'time chat';
    max-width: 962px;
    width: 100%;
    gap: 20px;
    margin: 10px;
  `,
};
