import { useState } from 'react';
import Modal from '@components/modal/modal';
import styled from 'styled-components';
import ReportChatHistory from './report-chat-history';
import ReportMember from './report-member';
import ReportTime from './report-time';
import ReportTopic from './report-topic';

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
        <S.ReportContent>
          <S.ReportArea>
            <ReportTopic />
            <ReportMember />
          </S.ReportArea>
          <S.ReportArea>
            <ReportTime />
            <ReportChatHistory />
          </S.ReportArea>
        </S.ReportContent>
        <S.Button onClick={handleCloseButtonClick}>확인</S.Button>
      </Modal>
    </button>
  );
};

export default ReportModal;

const S = {
  ReportContent: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 64px;
    margin: 8px;
    max-width: 600px;
    width: 100%;
  `,
  ReportArea: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
  `,

  Button: styled.button`
    padding: 8px 12px;
    border-radius: 8px;
    background-color: #cccccc;
  `,
};
