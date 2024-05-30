import styled from 'styled-components';
import ReportModal from './report-modal/report-modal';

const NOTES_DATAS = [
  {
    id: 1,
    title: '프론트 회의',
    createdAt: '24-05-29',
  },
  {
    id: 2,
    title: '주간 회의',
    createdAt: '24-05-29',
  },
  {
    id: 3,
    title: '백엔드 회의',
    createdAt: '24-05-29',
  },
  {
    id: 4,
    title: '프론트 회의',
    createdAt: '24-05-29',
  },
  {
    id: 5,
    title: '주간 회의',
    createdAt: '24-05-29',
  },
  {
    id: 6,
    title: '회식날짜 정하기',
    createdAt: '24-05-29',
  },
  {
    id: 7,
    title: '백엔드 회의',
    createdAt: '24-05-29',
  },
];

const MeetingNotes = () => {
  return (
    <S.Container>
      <S.MeetingNotesHeader>
        <S.DateRangeButtons>
          <button>시작 일자</button>
          <button>종료 일자</button>
        </S.DateRangeButtons>
        <S.NotesSearchBar type="text" placeholder="일자 또는 회의 이름으로 검색" />
      </S.MeetingNotesHeader>

      <S.MeetingNotesLists>
        {NOTES_DATAS.map((note) => (
          <S.MeetingNotesList key={note.id}>
            <ReportModal>
              <S.NoteTitle>{note.title}</S.NoteTitle>
              <S.NoteCreatedAt>{note.createdAt}</S.NoteCreatedAt>
            </ReportModal>
          </S.MeetingNotesList>
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

  NotesSearchBar: styled.input`
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 250px;
    padding: 10px;
    border-radius: 6px;
  `,

  MeetingNotesLists: styled.ul`
    display: flex;
    gap: 10px;
    flex-direction: column;
    margin-top: 15px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    padding: 10px;
    overflow-y: auto;
  `,

  MeetingNotesList: styled.li`
    transition: background-color 0.1s ease;
    &:hover {
      background-color: rgba(0, 0, 0, 0.07);
    }
    button {
      padding: 20px 50px;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
  `,

  NoteTitle: styled.span`
    font-size: 17px;
    margin-right: 10px;
  `,
  NoteCreatedAt: styled.span`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
  `,
};
