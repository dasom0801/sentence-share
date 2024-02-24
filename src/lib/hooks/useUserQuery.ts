import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { auth } from '../firebase.config';
import { getUser } from '../api';

export const QUERY_KEY = ['[GET]/api/user/me'];

const queryFn = async () => (await getUser()).data;

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
    staleTime: Infinity,
  });
};

export default useUserQuery;
