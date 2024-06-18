/* eslint-disable no-console */
import { TAxiosError } from '@api/axios';
import userRequest from '@api/user/user-request';
import { QUERY_KEY } from '@constants/query-key';
import { useToast } from '@hooks/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useUserQuery = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.userInfo],
    queryFn: async () => await userRequest.FetchUserData(),
  });
  return query;
};

export const useUserNicknameUpdateMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (nickName: string) => await userRequest.updateNickname(nickName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.userInfo] });
      queryClient.refetchQueries({ queryKey: [QUERY_KEY.groupInfo] });
      toast('닉네임이 변경되었습니다');
    },
    onError: (error: TAxiosError) => toast(error.errorMessage, true),
  });

  return mutation;
};

export const useUserProfileImgUpdateMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (userData: File) => await userRequest.updateProfileImg(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.userInfo] });
      toast('프로필이미지가 변경되었습니다');
    },
    onError: (error: TAxiosError) => toast(error.errorMessage, true),
  });

  return mutation;
};

export const useUserProfileImgDefaultMutation = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => await userRequest.updateProfileDefaultImg(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.userInfo] });
      toast('프로필이미지가 초기화 되었습니다');
    },
    onError: (error: TAxiosError) => toast(error.errorMessage, true),
  });

  return mutation;
};
