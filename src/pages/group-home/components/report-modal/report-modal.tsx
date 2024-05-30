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

  const handleOpenClick = () => {
    setIsOpen(true);
  };

  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    //이벤트 버블링 <button onClick={handleOpenClick}> 이벤트 방지
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <button onClick={handleOpenClick}>
      {children}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
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
        <S.Button onClick={handleCloseClick}>확인</S.Button>
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
  `,
  ReportArea: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    width: 300px;
  `,

  Button: styled.button`
    padding: 8px 12px;
    border-radius: 8px;
    background-color: #cccccc;
  `,
};
