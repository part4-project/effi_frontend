const loginMutation = useMutation({
  mutationFn: () => {
    const accessToken = getCookie('accessToken');
    return axios.post('url', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  },
  onSuccess: (response) => {
    console.log(response.data);
  },
  onError: (error) => {
    console.error(error);
  },
});
