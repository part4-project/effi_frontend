import dropDownArrow from '@assets/icons/arrow-down.svg';
import { NOTES_DATAS } from '@constants/mockdata';
import styled from 'styled-components';
import MeetingNoteItem from './meeting-note-item';

const MeetingNotes = () => {
  return (
    <S.Container>
      <S.MeetingNotesHeader>
        <S.DateRangeButtons>
          <S.DateRangeButton>
            시작 일자 <img src={dropDownArrow} />
          </S.DateRangeButton>
          <S.DateRangeButton>
            종료 일자 <img src={dropDownArrow} />
          </S.DateRangeButton>
        </S.DateRangeButtons>
        <S.NotesSearchBar type="text" placeholder="일자 또는 회의 이름으로 검색" />
      </S.MeetingNotesHeader>

      <S.MeetingNotesLists>
        {NOTES_DATAS.map((note) => (
          <S.MeetingNoteItem key={note.id}>
            <MeetingNoteItem note={note} />
          </S.MeetingNoteItem>
        ))}
      </S.MeetingNotesLists>
    </S.Container>
  );
};

export default MeetingNotes;

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

  DateRangeButtons: styled.div`
    display: flex;
    gap: 20px;
  `,

  DateRangeButton: styled.button`
    background-color: white;
    color: #367262;
    font-size: 14px;
    border: medium;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 21px;
    padding: 9px 6px 9px 17px;
    img {
      width: 24px;
    }
  `,

  NotesSearchBar: styled.input`
    width: 260px;
    padding: 10px;
    border-radius: 10px;
  `,

  MeetingNotesLists: styled.ul`
    display: flex;
    gap: 3px;
    flex-direction: column;
    margin-top: 15px;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
  `,

  MeetingNoteItem: styled.li`
    scroll-snap-align: start;
  `,
};
