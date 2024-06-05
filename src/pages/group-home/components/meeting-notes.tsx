import { ChangeEvent, KeyboardEventHandler, useState } from 'react';
import SearchIcon from '@assets/icons/search.svg';
import { NOTES_DATAS } from '@constants/mockdata';
import { TNoteItem } from '@constants/mockdata.type';
import DateRangeCalendar from '@pages/group-home/components/date-range-calendar';
import MeetingNoteItem from '@pages/group-home/components/meeting-note-item';
import { filteredNotesBySearchQuery } from '@pages/group-home/utils/date-range-filter';
import styled from 'styled-components';

const MeetingNotes = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const filteredNotes = filteredNotesBySearchQuery(NOTES_DATAS, dateRange, searchQuery);

  const handleSearch: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchQuery(e.currentTarget.value);
    }
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value === '') {
      setSearchQuery(e.target.value);
    }
  };

  return (
    <S.Container>
      <S.MeetingNotesHeader>
        <DateRangeCalendar dateRange={dateRange} setDateRange={setDateRange} />

        <S.NotesSearchBarBox>
          <S.NotesSearchBar
            type="text"
            placeholder="일자 또는 회의 이름으로 검색"
            value={inputValue}
            onChange={handleSearchInputChange}
            onKeyDown={handleSearch}
          />
          <S.NotesSearchIcon>
            <img src={SearchIcon} alt="search" />
          </S.NotesSearchIcon>
        </S.NotesSearchBarBox>
      </S.MeetingNotesHeader>

      <S.MeetingNotesLists>
        {filteredNotes.length === 0 ? (
          <div>해당 조건의 회의록이 없습니다.</div>
        ) : (
          filteredNotes.map((note: TNoteItem) => (
            <S.MeetingNoteItem key={note.id}>
              <MeetingNoteItem note={note} />
            </S.MeetingNoteItem>
          ))
        )}
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

  NotesSearchBar: styled.input`
    width: 260px;
    padding: 10px 35px 10px 10px;
    border-radius: 10px;
  `,

  MeetingNotesLists: styled.ul`
    display: flex;
    gap: 3px;
    flex-direction: column;
    margin-top: 15px;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--blue04);
      border-radius: 50px;
    }
    &::-webkit-scrollbar-track {
      border-radius: 50px;
    }
  `,

  MeetingNoteItem: styled.li`
    scroll-snap-align: start;
  `,

  NotesSearchBarBox: styled.div`
    position: relative;
  `,

  NotesSearchIcon: styled.div`
    position: absolute;
    top: 18%;
    right: 4%;
  `,
};
