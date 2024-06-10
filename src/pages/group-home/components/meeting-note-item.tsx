import testImg from '@assets/default-profile.png';
import { TNoteItem } from '@constants/mockdata.type';
import ReportModalButton from '@pages/group-home/components/report-modal/report-modal-button';
import styled from 'styled-components';
import { calculateCompletedPercentage } from '../utils/completed-percentage-calculate';

interface TMeetingNoteItemProps {
  note: TNoteItem;
}

const MeetingNoteItem = ({ note }: TMeetingNoteItemProps) => {
  const percentageCompleted = calculateCompletedPercentage(note);

  return (
    <S.Container>
      <ReportModalButton>
        <S.MeetingNotesList>
          <S.MeetingTitleAndTimeContainer>
            <S.NoteTitle>{note.title}</S.NoteTitle>
            <S.NoteCreatedAt>{note.createdAt}</S.NoteCreatedAt>
          </S.MeetingTitleAndTimeContainer>

          <S.PercentageContainer>
            <S.PercentageTitle>진행률</S.PercentageTitle>
            <S.PercentageBar>
              <S.CompletedPercentageBar $percentage={percentageCompleted}></S.CompletedPercentageBar>
            </S.PercentageBar>
            <S.Percentage>{percentageCompleted}%</S.Percentage>
          </S.PercentageContainer>

          <S.MemberImgContainer>
            <div>
              <img src={testImg} />
            </div>
            <div>
              <img src={testImg} />
            </div>
            <div>
              <img src={testImg} />
            </div>
          </S.MemberImgContainer>
        </S.MeetingNotesList>
      </ReportModalButton>
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
    justify-content: space-between;
    padding: 0 36px;

    cursor: pointer;
    transition: background-color 0.2s ease;
    &:hover {
      background-color: var(--white);
      span {
        color: var(--blue05);
      }
    }
  `,

  MeetingTitleAndTimeContainer: styled.div`
    width: 40%;
    display: flex;
    align-items: center;
  `,

  NoteTitle: styled.span`
    font-size: 20px;
    margin-right: 17px;
    color: var(--blue01);
    font-weight: bold;
  `,

  NoteCreatedAt: styled.span`
    font-size: 14px;
    color: var(--blue01);
  `,

  PercentageContainer: styled.div`
    width: 50%;
    display: flex;
    align-items: center;
  `,

  PercentageTitle: styled.span`
    margin-right: 10px;
    width: 170px;
    color: var(--blue05);
    font-weight: 500;
    font-size: 18px;
  `,

  PercentageBar: styled.div`
    background-color: var(--blue04);
    display: flex;
    width: 365px;
    height: 15px;
    border-radius: 50px;
  `,

  CompletedPercentageBar: styled.div<{ $percentage: string }>`
    background-color: var(--blue01);
    display: flex;
    width: ${({ $percentage }) => `${$percentage}%`};
    height: 15px;
    border-radius: 50px;
  `,

  Percentage: styled.span`
    margin-left: 20px;
    color: var(--blue05);
    font-size: 16px;
    width: 100px;
  `,

  MemberImgContainer: styled.span`
    position: relative;
    width: 80px;
    height: 30px;
    display: flex;
    margin-left: 20px;
    div {
      width: 28px;
      height: 28px;
      background-color: var(--blue01);
      border: 1px solid var(--blue05);
      border-radius: 50px;
      position: absolute;
      overflow: hidden;
    }
    div:nth-child(1) {
      right: 0;
      z-index: 2;
    }
    div:nth-child(2) {
      right: 22px;
      z-index: 1;
    }
    div:nth-child(3) {
      right: 44px;
      z-index: 0;
    }
  `,
};
