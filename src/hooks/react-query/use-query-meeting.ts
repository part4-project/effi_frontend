import { TAxiosError } from '@api/axios';
import meetingRequest from '@api/meeting/meeting-request';
import { TMeetingCreateReq } from '@api/meeting/meeting-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useToast } from '@hooks/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useMeetingCreateMutation = (groupId: number) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (meetingData: TMeetingCreateReq) => await meetingRequest.createMeeting(meetingData, groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.meetingList, groupId] });
      toast('회의가 생성되었습니다');
    },
    onError: (error: TAxiosError) => toast(error.errorMessage, true),
  });

  return mutation;
};
export const useMeetingUpdateMutation = (groupId: number, meetingId: number | undefined) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (meetingData: TMeetingCreateReq) =>
      await meetingRequest.updateMeeting(meetingData, groupId, meetingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.meetingList, groupId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.meetingInfo, meetingId] });
      toast('회의가 수정되었습니다');
    },
    onError: (error: TAxiosError) => toast(error.errorMessage, true),
  });

  return mutation;
};
export const useMeetingListQuery = (groupId: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.meetingList, groupId],
    queryFn: async () => await meetingRequest.fetchMeetingList(groupId),
  });
  return query;
};

export const useMeetingQuery = (meetingId: number | null) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.meetingInfo, meetingId],
    queryFn: async () => await meetingRequest.fetchMeeting(meetingId),
    enabled: !!meetingId,
  });
  return query;
};

export const useUpdateMeetingEndDate = (groupId: number, meetingId: number) => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (actualEndDate: string) =>
      await meetingRequest.updateMeetingEndDate(groupId, meetingId, actualEndDate),

    onSuccess: () => {
      toast('리포트가 생성되었습니다');
    },
    onError: (error: TAxiosError) => {
      toast(error.errorMessage, true);
    },
  });

  return mutation;
};
