// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { TReportInfo } from '@api/report/report-request.type';

import { useMeetingQuery } from '@hooks/react-query/use-query-meeting';
import ReportModalButton from '@pages/group-home/components/report-modal/report-modal-button';
import { device } from '@styles/breakpoints';
import styled, { keyframes } from 'styled-components';
import { calculateCompletedPercentage } from '../utils/completed-percentage-calculate';

interface TMeetingNoteItemProps {
  report: TReportInfo;
  groupId: number;
}

const MeetingNoteItem = ({ report, groupId }: TMeetingNoteItemProps) => {
  const { data: meetingData } = useMeetingQuery(report.meetingId);
  const meetingTitle = meetingData?.meetingTitle;

  const percentageCompleted = calculateCompletedPercentage(report.topicList);

  const isoDateString = report.startDate;
  const date = new Date(isoDateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}`;

  return (
    <S.Container>
      <ReportModalButton groupId={groupId} meetingId={report.meetingId}>
        <S.MeetingNotesList>
          <S.MeetingTitleAndTimeContainer>
            <S.NoteTitle>{meetingTitle}</S.NoteTitle>
            <S.NoteCreatedAt>
              {formattedDate}
              <S.NoteCreatedAtTime>{formattedTime}</S.NoteCreatedAtTime>
            </S.NoteCreatedAt>
          </S.MeetingTitleAndTimeContainer>

          <S.MeetingInfoContainer>
            <S.PercentageContainer>
              <S.PercentageTitle>진행률</S.PercentageTitle>

              <S.PercentageBar>
                <S.CompletedPercentageBar $percentage={percentageCompleted}></S.CompletedPercentageBar>
              </S.PercentageBar>
            </S.PercentageContainer>

            <S.MemberImgContainer>
              {report.participantList.length > 3 && (
                <S.MoreParticipants>+{report.participantList.length - 3}</S.MoreParticipants>
              )}
              {report.participantList.slice(0, 3).map((participant) => (
                <div key={participant.userId}>
                  <img src={participant.profileImageUrl} />
                </div>
              ))}
            </S.MemberImgContainer>
          </S.MeetingInfoContainer>
        </S.MeetingNotesList>
      </ReportModalButton>
    </S.Container>
  );
};

export default MeetingNoteItem;

const animateWidth = keyframes`
  from {
    width: 0;
  }
  to {
    width: var(--percentage);
  }
`;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    scroll-snap-align: start;
  `,

  MeetingNotesList: styled.li`
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 0 36px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    height: 107px;
    &:hover {
      background-color: var(--white);
      span {
        color: ${(props) => props.theme.theme05};
      }
    }

    @media ${device.mobile} {
      gap: 8px;
      height: 106px;
      position: relative;
    }
  `,

  MeetingTitleAndTimeContainer: styled.div`
    width: 100%;
    display: flex;
    align-items: center;

    @media ${device.mobile} {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
  `,

  MeetingInfoContainer: styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  `,

  NoteTitle: styled.span`
    width: 100%;
    text-align: left;
    font-size: 20px;
    margin-right: 17px;
    color: ${(props) => props.theme.text06};
    font-weight: bold;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media ${device.mobile} {
      font-size: 18px;
    }
  `,

  NoteCreatedAt: styled.span`
    letter-spacing: 1.5px;
    width: 90%;
    text-align: right;
    font-size: 17px;
    color: ${(props) => props.theme.text06};
    font-weight: 600;
  `,

  NoteCreatedAtTime: styled.span`
    font-size: 15px;
    margin-left: 7px;
    font-weight: 500;
  `,

  PercentageContainer: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    @media ${device.mobile} {
      width: 100%;
    }
  `,

  PercentageTitle: styled.span`
    width: 70px;
    margin-right: 10px;
    color: ${(props) => props.theme.text03};
    font-weight: 500;
    font-size: 18px;
    text-align: start;

    @media ${device.mobile} {
      display: none;
    }
  `,

  PercentageBar: styled.div`
    background-color: ${(props) => props.theme.percentBar};
    display: flex;
    width: 70%;
    height: 15px;
    border-radius: 50px;
    @media ${device.mobile} {
      width: 586px;
    }
  `,

  CompletedPercentageBar: styled.div<{ $percentage: string }>`
    --percentage: ${({ $percentage }) => `${$percentage}%`};
    background-color: ${(props) => props.theme.theme01};
    display: flex;
    width: var(--percentage);
    height: 15px;
    border-radius: 50px;
    animation: ${animateWidth} 1s cubic-bezier(0.3, 0, 0.2, 1);
  `,

  Percentage: styled.span`
    margin-left: 20px;
    color: ${(props) => props.theme.text03};
    font-size: 16px;
    width: 100px;
    @media ${device.mobile} {
      display: none;
    }
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
      background-color: ${(props) => props.theme.theme02};
      color: ${(props) => props.theme.text02};
      border: 1px solid var(--blue05);
      border-radius: 50px;
      position: absolute;
      overflow: hidden;
    }
    div:nth-child(1) {
      right: 0;
      z-index: 3;
    }
    div:nth-child(2) {
      right: 22px;
      z-index: 2;
    }
    div:nth-child(3) {
      right: 44px;
      z-index: 1;
    }
    div:nth-child(4) {
      right: 66px;
      z-index: 0;
    }
    @media ${device.mobile} {
      position: absolute;
      top: 25%;
      right: 15px;
      div {
        width: 26px;
        height: 26px;
      }
      div:nth-child(1) {
        right: 20px;
        z-index: 3;
      }
      div:nth-child(2) {
        right: 40px;
        z-index: 2;
      }
      div:nth-child(3) {
        right: 60px;
        z-index: 1;
      }
      div:nth-child(4) {
        right: 80px;
        z-index: 0;
      }
    }
  `,

  MoreParticipants: styled.div`
    width: 28px;
    height: 28px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 66px;
    color: white;
    font-size: 12px;
    z-index: 0;
    @media ${device.mobile} {
      width: 18px;
      height: 18px;
      right: 56px;
      font-size: 10px;
    }
  `,
};
