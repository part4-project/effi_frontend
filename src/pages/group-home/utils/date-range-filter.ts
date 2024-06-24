import { TReportList } from '@api/report/report-request.type';

export const filteredNotesBySearchQuery = (reportLists: TReportList, searchQuery: string) => {
  return reportLists?.filter((report) => {
    return searchQuery.trim() === '' || report.startDate.toLowerCase().includes(searchQuery.toLowerCase());
  });
};
