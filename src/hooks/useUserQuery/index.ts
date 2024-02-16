import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { auth } from '../../config/firebase.config';
import { axios } from '../../api';

export const QUERY_KEY = ['/api/user/me'];

const queryFn = async () => {
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

const useUserQuery = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      const userToken = await user?.getIdToken();
      const storageToken = localStorage.getItem('token');

      if (userToken) {
        if (userToken !== storageToken) {
          localStorage.setItem('token', userToken);
          await queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        }
      } else {
        localStorage.removeItem('token');
        await queryClient.setQueryData(QUERY_KEY, null);
      }
    });

    return unsubscribe;
  }, [queryClient]);

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn,
  });
};

export default useUserQuery;
