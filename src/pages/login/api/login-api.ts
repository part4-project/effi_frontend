import { useMutation } from '@tanstack/react-query';

export const loginMutation = useMutation(
  (accessToken) => {
    // API 요청을 보냄
    return fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  },
  {
    onSuccess: (data: string) => {
      console.log(data);
    },
    onError: (error: string) => {
      console.error(error);
    },
  },
);
