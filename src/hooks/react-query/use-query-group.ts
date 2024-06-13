/* eslint-disable no-console */
import groupRequest from '@api/group/group-request';
import { TInvitedGroupFetchRes } from '@api/group/group-request.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGroupQuery = () => {
  const query = useQuery({
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
    mutationFn: async (groupName: string) => await groupRequest.updateGroup(groupName, groupId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [`group`, groupId] });
      queryClient.invalidateQueries({ queryKey: [`groupList`] });
    },
    onError: (error) => console.log(`그룹명 수정 에러: ${error}`),
  });

  return mutation;
};

export const useInvitedGroupQuery = () => {
  const query = useQuery<TInvitedGroupFetchRes[], Error>({
    queryKey: [`invitedGroupList`],
    queryFn: async () => await groupRequest.fetchInvitedGroup(),
  });
  return query;
};

export const useInvitedGroupAcceptMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (groupId: number) => await groupRequest.acceptInvitedGroup(groupId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [`invitedGroupList`] });
      queryClient.invalidateQueries({ queryKey: [`groupList`] });
    },
    onError: (error) => console.log(`그룹 초대 수락 에러: ${error}`),
  });

  return mutation;
};

export const useInvitedGroupRejectMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (groupId: number) => await groupRequest.rejectInvitedGroup(groupId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [`invitedGroupList`] });
      queryClient.invalidateQueries({ queryKey: [`groupList`] });
    },
    onError: (error) => console.log(`그룹 초대 거절 에러: ${error}`),
  });

  return mutation;
};
