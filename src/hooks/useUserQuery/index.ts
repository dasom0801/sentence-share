import { useQuery, useQueryClient } from '@tanstack/react-query';
import { auth } from '../../config/firebase.config';
import { useEffect } from 'react';
import { getUser } from '../../api/user';

export const QUERY_KEY = ['/api/user/me'];

const queryFn = async () => await getUser();

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
