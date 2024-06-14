/* eslint-disable no-console */
import userRequest from '@api/user/user-request';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useUserQuery = () => {
  const query = useQuery({
    queryKey: [`userInfo`],
    queryFn: async () => await userRequest.FetchUserData(),
  });
  return query;
};

export const useUserNicknameUpdateMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (nickName: string) => await userRequest.updateNickname(nickName),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [`userInfo`] });
      queryClient.refetchQueries({ queryKey: [`groupInfo`] });
    },
    onError: (error) => console.error(`유저 이름변경 에러: ${error}`),
  });

  return mutation;
};

export const useUserProfileImgUpdateMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (userData: File) => await userRequest.updateProfileImg(userData),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [`userInfo`] });
    },
    onError: (error) => console.log(`유저 프로필사진 변경 에러: ${error}`),
  });

  return mutation;
};

export const useUserProfileImgDefaultMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => await userRequest.updateProfileDefaultImg(),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [`userInfo`] });
    },
    onError: (error) => console.log(`유저 프로필사진(기본) 변경 에러: ${error}`),
  });

  return mutation;
};
