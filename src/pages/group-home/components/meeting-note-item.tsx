import { TNoteItem } from '@constants/mockdata.type';
import ReportModal from '@pages/group-home/components/report-modal/report-modal';
import styled from 'styled-components';
import { calculateCompletedPercentage } from '../utils/completed-percentage-calculate';

interface TMeetingNoteItemProps {
  note: TNoteItem;
}

const MeetingNoteItem = ({ note }: TMeetingNoteItemProps) => {
  const percentageCompleted = calculateCompletedPercentage(note);

  return (
    <S.Container>
      <ReportModal>
        <S.MeetingNotesList>
          <S.MeetingTitleAndTime>
            <S.NoteTitle>{note.title}</S.NoteTitle>
            <S.NoteCreatedAt>{note.createdAt}</S.NoteCreatedAt>
          </S.MeetingTitleAndTime>

          <S.PercentageContainer>
            <S.PercentageTitle>회의 달성률</S.PercentageTitle>
            <S.PercentageBar>
              <S.CompletedPercentage $percentage={percentageCompleted}></S.CompletedPercentage>
            </S.PercentageBar>
            <S.Percentage>{percentageCompleted}%</S.Percentage>
          </S.PercentageContainer>
        </S.MeetingNotesList>
      </ReportModal>
    </S.Container>
  );
};

export default MeetingNoteItem;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    scroll-snap-align: start;
  `,

  MeetingNotesList: styled.li`
    background-color: rgba(255, 255, 255, 0.4);

    height: 72px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 0 36px;

    cursor: pointer;
    transition: background-color 0.2s ease;
    &:hover {
      background-color: white;
    }
  `,

  MeetingTitleAndTime: styled.div`
    width: 40%;
    display: flex;
    align-items: center;
  `,

  NoteTitle: styled.span`
    font-size: 20px;
    margin-right: 17px;
    color: #367262;
    font-weight: bold;
  `,

  NoteCreatedAt: styled.span`
    font-size: 14px;
    color: #367262;
  `,

  PercentageContainer: styled.div`
    display: flex;
    align-items: center;
  `,

  PercentageTitle: styled.span`
    margin-right: 10px;
    color: #9e9e9e;
    font-weight: 500;
    font-size: 20px;
  `,

  PercentageBar: styled.div`
    background-color: #d9d9d9;
    display: flex;
    width: 365px;
    height: 15px;
    border-radius: 50px;
  `,

  CompletedPercentage: styled.div<{ $percentage: string }>`
    background-color: #367262;
    display: flex;
    width: ${({ $percentage }) => `${$percentage}%`};
    height: 15px;
    border-radius: 50px;
  `,

  Percentage: styled.span`
    margin-left: 23px;
    color: #9e9e9e;
    font-weight: 500;
    font-size: 20px;
  `,
};
