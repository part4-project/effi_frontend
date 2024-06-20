import { TAxiosError } from '@api/axios';
import meetingRequest from '@api/meeting/meeting-request';
import { TMeetingCreateReq } from '@api/meeting/meeting-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useToast } from '@hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
