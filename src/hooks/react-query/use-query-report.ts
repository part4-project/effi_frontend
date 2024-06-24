import reportRequest from '@api/report/report-request';
import { QUERY_KEY } from '@constants/query-key';
import { useQuery } from '@tanstack/react-query';

export const useReportListQuery = (groupId: number, startDate: string, endDate: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.reportList, groupId],
    queryFn: async () => await reportRequest.fetchReportList(groupId, startDate, endDate),
  });
  return query;
};

export const useReportQuery = (groupId: number, meetingId: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.reportInfo, meetingId],
    queryFn: async () => await reportRequest.fetchReport(groupId, meetingId),
  });
  return query;
};
