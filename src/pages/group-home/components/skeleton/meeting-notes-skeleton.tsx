import { skeleton, skeletonAnimation } from '@styles/skeleton';
import styled from 'styled-components';

const MeetingNotesSkeleton = () => {
  return (
    <S.Container>
      <S.MeetingNotesHeader>
        <S.DateRangeCalendar />
        <S.NotesSearchBarBox>
          <S.NotesSearchBar />
        </S.NotesSearchBarBox>
      </S.MeetingNotesHeader>
      <S.MeetingNotesLists />
    </S.Container>
  );
};

export default MeetingNotesSkeleton;

const S = {
  Container: styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  `,

  MeetingNotesHeader: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  DateRangeCalendar: styled.div`
    width: 220px;
    height: 35px;
    ${skeleton}
    &::before {
      ${skeletonAnimation}
    }
  `,

  NotesSearchBar: styled.div`
    width: 260px;
    height: 36px;
    ${skeleton}
    &::before {
      ${skeletonAnimation}
    }
  `,

  MeetingNotesLists: styled.ul`
    display: flex;
    gap: 3px;
    height: 300px;
    flex-direction: column;
    margin-top: 15px;
    ${skeleton}
    &::before {
      ${skeletonAnimation}
    }
  `,

  NotesSearchBarBox: styled.div`
    position: relative;
  `,
};
