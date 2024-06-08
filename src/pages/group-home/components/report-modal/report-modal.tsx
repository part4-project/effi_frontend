import Modal from '@components/modal/modal';
import styled from 'styled-components';
import ReportChattingBox from './report-chatting-box';
import ReportMember from './report-member';
import ReportTime from './report-time';
import ReportTopicList from './report-topic-list';
interface GroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportModal = ({ isOpen, onClose }: GroupModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} headerTitle="회의주제">
      <S.ReportContent>
        <ReportTopicList />
        <ReportMember />
        <ReportTime />
        <ReportChattingBox />
      </S.ReportContent>
    </Modal>
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
