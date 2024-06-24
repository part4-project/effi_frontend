/* eslint-disable no-unused-vars */
import { TAxiosError } from '@api/axios';
import topicRequest from '@api/topic/topic-request';
import { QUERY_KEY } from '@constants/query-key';
import { useToast } from '@hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useTopicCheckMutation = (groupId: number, meetingId: number) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (topicStateList: boolean[]) => await topicRequest.checkTopic(groupId, meetingId, topicStateList),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.meetingInfo, meetingId] });
    },
    onError: (error: TAxiosError) => {
      toast(error.errorMessage, true);
    },
  });

  return mutation;
};
