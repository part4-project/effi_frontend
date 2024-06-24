import Modal from '@components/modal/modal';
import { useReportQuery } from '@hooks/react-query/use-query-report';
import styled from 'styled-components';
import ReportChattingBox from './report-chatting-box';
import ReportMember from './report-member';
import ReportTime from './report-time';
import ReportTopicList from './report-topic-list';
interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: number;
  meetingId: number;
}

const ReportModal = ({ isOpen, onClose, groupId, meetingId }: ReportModalProps) => {
  const { data: reportData, isLoading, isError } = useReportQuery(groupId, meetingId);

  if (isLoading) return 'Loading...';
  if (isError) return 'Error...';

  const { startDate, expectedEndDate, actualEndDate, topicList, participantList, chattingList } = reportData;

  return (
    <Modal isOpen={isOpen} onClose={onClose} headerTitle="회의록">
      <S.ReportContent>
        <ReportTopicList topicList={topicList} />
        <ReportMember participantList={participantList} />
        <ReportTime startDate={startDate} expectedEndDate={expectedEndDate} actualEndDate={actualEndDate} />
        <ReportChattingBox chattingList={chattingList} />
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
    gap: 20px;
    margin: 10px;
  `,
};
