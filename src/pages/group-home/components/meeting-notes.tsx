import { ChangeEvent, KeyboardEventHandler, useEffect, useState } from 'react';
import { TReportInfo } from '@api/report/report-request.type';
import EmptyNotice from '@components/empty-notice';
import { useReportListQuery } from '@hooks/react-query/use-query-report';
import DateRangeCalendar from '@pages/group-home/components/date-range-calendar';
import MeetingNoteItem from '@pages/group-home/components/meeting-note-item';
import { filteredNotesBySearchQuery } from '@pages/group-home/utils/date-range-filter';
import { useGroupStore } from '@stores/group';
import { device } from '@styles/breakpoints';
import styled, { useTheme } from 'styled-components';
import MeetingNotesSkeleton from './skeleton/meeting-notes-skeleton';
import { formatDateToISOStringWithOffset } from '../utils/format-date-to-string';
import { getCurrentMonthRange } from '../utils/get-current-month-range';

const MeetingNotes = () => {
  const theme = useTheme();
  const groupId = useGroupStore((state) => state.groupId);
  const currentMonthRange = getCurrentMonthRange();

  const [dateRange, setDateRange] = useState<Date[]>(currentMonthRange);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);

  const [startUTF, endUTF] = dateRange;

  const startDate = formatDateToISOStringWithOffset(startUTF).split('T')[0];
  const endDate = formatDateToISOStringWithOffset(endUTF).split('T')[0];

  const { data: reportListData, isLoading, refetch } = useReportListQuery(groupId, startDate, endDate);
  const filteredNotes = filteredNotesBySearchQuery(reportListData, searchQuery);

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

  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery]);

  return (
    <S.Container>
      <S.MeetingNotesHeader>
        <DateRangeCalendar
          dateRange={dateRange}
          setDateRange={setDateRange}
          currentMonthRange={currentMonthRange}
          refetch={refetch}
        />

        <S.NotesSearchBarBox>
          <S.NotesSearchBar
            type="text"
            placeholder="일자 또는 회의 이름 검색"
            value={inputValue}
            onChange={handleSearchInputChange}
            onKeyDown={handleSearch}
          />
          <S.NotesSearchIcon>
            <img src={theme.search} alt="search" />
          </S.NotesSearchIcon>
        </S.NotesSearchBarBox>
      </S.MeetingNotesHeader>

      {isLoading ? (
        <MeetingNotesSkeleton />
      ) : (
        <S.MeetingNotesLists>
          {filteredNotes?.length === 0 ? (
            <S.EmptyNoticeContaier>
              <EmptyNotice>
                {isSearching
                  ? '해당 조건의 리포트가 없습니다.'
                  : `회의 리포트가 없습니다.\n회의를 진행하고 기록을 남겨보세요!`}
              </EmptyNotice>
            </S.EmptyNoticeContaier>
          ) : (
            filteredNotes
              ?.sort((a: TReportInfo, b: TReportInfo) => b.meetingId - a.meetingId)
              .map((report: TReportInfo) => (
                <S.MeetingNoteItem key={report.meetingId}>
                  <MeetingNoteItem report={report} groupId={groupId} />
                </S.MeetingNoteItem>
              ))
          )}
        </S.MeetingNotesLists>
      )}
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
    min-width: 228px;
  `,

  MeetingNotesHeader: styled.div`
    display: flex;
    justify-content: space-between;
    gap: 12px;
    @media ${device.mobile} {
      flex-direction: column;
    }
  `,

  NotesSearchBar: styled.input`
    width: 260px;
    padding: 10px 35px 10px 10px;
    border-radius: 10px;
    font-size: 14px;
    @media ${device.tablet} {
      width: 100%;
      font-size: 11px;
    }
    @media ${device.mobile} {
      width: 100%;
    }
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
      background-color: ${(props) => props.theme.theme08};
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
    @media ${device.mobile} {
      width: 100%;
    }
  `,

  NotesSearchIcon: styled.div`
    position: absolute;
    top: 18%;
    right: 4%;
    @media ${device.mobile} {
      right: 1%;
    }
  `,

  EmptyNoticeContaier: styled.div`
    line-height: 22px; /* 137.5% */
    height: 300px;
    white-space: pre-line;
  `,
};
