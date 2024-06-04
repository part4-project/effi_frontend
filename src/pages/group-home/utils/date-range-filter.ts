import { TNoteItem } from '@constants/mockdata.type';

const parseDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(2000 + year, month - 1, day);
};

const filterNotesByDateRange = (notes: TNoteItem[], [startDate, endDate]: [Date | null, Date | null]) => {
  if (!startDate || !endDate) return notes;

  return notes.filter((note) => {
    const noteDate = parseDate(note.createdAt);
    return noteDate >= startDate && noteDate <= endDate;
  });
};

export const filteredNotesBySearchQuery = (
  notes: TNoteItem[],
  dateRange: [Date | null, Date | null],
  searchQuery: string,
) => {
  return filterNotesByDateRange(notes, dateRange).filter((note) => {
    return (
      searchQuery.trim() === '' ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.createdAt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
};
