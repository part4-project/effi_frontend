import { useState } from 'react';
import Modal from '@components/modal/modal';
import ModalHeader from '@components/modal/modal-header';
import { TMeetingRoom, TTopic } from '@constants/mockdata.type';
// import styled from 'styled-components';
import MeetingForm from './meeting-form';

interface GroupModalProps {
  children: React.ReactNode;
  title: string;
  data?: TMeetingRoom;
  topicData?: TTopic;
}

const MeetingModal = ({ children, title, data, topicData }: GroupModalProps) => {
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
        <ModalHeader headerTitle={title} onClose={handleCloseButtonClick} />
        <MeetingForm data={data} topicData={topicData} />

        {/* 다른 handleClick함수 들어올 수 있음 */}
        {/* <S.ButtonContainer>
          {title == '회의 생성' ? (
            <>
              <button onClick={handleCloseButtonClick}>취소</button>
              <button onClick={handleCloseButtonClick}>생성</button>
            </>
          ) : (
            <>
              <button onClick={handleCloseButtonClick}>삭제</button>
              <button onClick={handleCloseButtonClick}>수정</button>
            </>
          )}
        </S.ButtonContainer> */}
      </Modal>
    </button>
  );
};

export default MeetingModal;

// const S = {
//   Container: styled.div``,

//   ButtonContainer: styled.div`
//     font-size: 20px;
//     font-weight: 600;
//     display: flex;
//     gap: 10px;
//     button {
//       cursor: pointer;
//       background-color: rgba(0, 0, 0, 0.1);
//       padding: 6px 10px;
//       border-radius: 6px;
//     }
//   `,
// };
