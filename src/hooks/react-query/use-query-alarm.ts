import alarmRequest from '@api/alarm/alarm-request';
import { TAlarm } from '@api/alarm/alarm-request.type';
import { TAxiosError } from '@api/axios';
import { QUERY_KEY } from '@constants/query-key';
import { useToast } from '@hooks/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useAlarmQuery = () => {
  const query = useQuery<TAlarm[], Error>({
    queryKey: [QUERY_KEY.alarmList],
    queryFn: async () => await alarmRequest.fetchAlarm(),
  });
  return query;
};

export const useAlarmDeleteMutation = () => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (alarmId: string) => await alarmRequest.deleteAlarm(alarmId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.alarmList] });
    },
    onError: (error: TAxiosError) => toast(error.errorMessage, true),
  });

  return mutation;
};
