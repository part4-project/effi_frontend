/* eslint-disable no-console */
import { TAxiosError } from '@api/axios';
import groupRequest from '@api/group/group-request';
import { TGroupFetchInfo, TInvitedGroupFetchRes } from '@api/group/group-request.type';
import { QUERY_KEY } from '@constants/query-key';
import { useToast } from '@hooks/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGroupQuery = () => {
  const query = useQuery<TGroupFetchInfo[], Error>({
    queryKey: [QUERY_KEY.groupList],
    queryFn: async () => await groupRequest.fetchGroup(),
  });
  return query;
};

export const useGroupMemberQuery = (groupId: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.groupInfo, groupId],
    queryFn: async () => await groupRequest.fetchGroupMember(groupId),
  });
  return query;
};

export const useGroupCreateMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (groupData: string) => await groupRequest.createGroup(groupData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.groupList] });
      toast('그룹이 생성되었습니다');
    },
    onError: (error: TAxiosError) => toast(error.errorMessage, true),
  });

  return mutation;
};

export const useGroupUpdateMutation = (groupId: number) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (groupName: string) => await groupRequest.updateGroup(groupName, groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.groupInfo, groupId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.groupList] });
      toast('그룹명이 변경되었습니다');
    },
    onError: (error: TAxiosError) => toast(error.errorMessage, true),
  });

  return mutation;
};

export const useInvitedGroupQuery = () => {
  const query = useQuery<TInvitedGroupFetchRes[], Error>({
    queryKey: [QUERY_KEY.invitedGroupList],
    queryFn: async () => await groupRequest.fetchInvitedGroup(),
  });
  return query;
};

export const useInvitedGroupAcceptMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (groupId: number) => await groupRequest.acceptInvitedGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.invitedGroupList] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.groupList] });
      toast('초대가 수락되었습니다');
    },
    onError: (error: TAxiosError) => toast(error.errorMessage, true),
  });

  return mutation;
};

export const useInvitedGroupRejectMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (groupId: number) => await groupRequest.rejectInvitedGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.invitedGroupList] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.groupList] });
      toast('초대를 거절했습니다');
    },
    onError: (error: TAxiosError) => toast(error.errorMessage, true),
  });

  return mutation;
};

export const useGroupInviteMutation = (groupId: number) => {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (targetEmail: string) => await groupRequest.inviteGroup(targetEmail, groupId),
    onSuccess: () => toast('초대가 완료되었습니다'),
    onError: (error: TAxiosError) => toast(error.errorMessage, true),
  });
  return mutation;
};
