/* eslint-disable no-console */
import meetingRequest from '@api/meeting/meeting-request';
import { TMeetingCreateReq } from '@api/meeting/meeting-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMeetingCreateMutation = (groupId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (meetingData: TMeetingCreateReq) => await meetingRequest.createMeeting(meetingData, groupId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.meetingList, groupId] });
    },
    onError: (error) => console.error(`회의 생성 에러: ${error}`),
  });

  return mutation;
};
