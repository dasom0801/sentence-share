import axios from './api';

export const getUser = async () => {
  const token = localStorage.getItem('token');
  const authorization = token ? `Bearer ${token}` : null;
  return (
    await axios.get<User>('/api/user/me', {
      headers: {
        authorization,
      },
    })
  ).data;
};
