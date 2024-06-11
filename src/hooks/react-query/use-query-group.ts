/* eslint-disable no-console */
import groupRequest from '@api/group/group-request';
import { TGroupFetchRes } from '@api/group/group-request.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGroupQuery = () => {
  const query = useQuery<TGroupFetchRes | unknown>({
    queryKey: [`groupList`],
    queryFn: async () => await groupRequest.fetchGroup(),
  });
  return query;
};

export const useGroupMemberQuery = (groupId: number) => {
  const query = useQuery({
    queryKey: [`groupMember`, groupId],
    queryFn: async () => await groupRequest.fetchGroup(),
  });
  return query;
};

export const useGroupCreateMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (groupData: string) => await groupRequest.createGroup(groupData),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [`groupList`] });
    },
    onError: (error) => console.log(`그룹 생성 에러: ${error}`),
  });

  return mutation;
};

export const useGroupUpdateMutation = (groupId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (groupData: string) => await groupRequest.updateGroup(groupData, groupId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [`group`, groupId] });
    },
    onError: (error) => console.log(`그룹명 수정 에러: ${error}`),
  });

  return mutation;
};
