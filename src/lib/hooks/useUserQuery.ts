import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { auth } from '../firebase.config';
import { getUser } from '../api';

export const QUERY_KEY = ['[GET]/api/user/me'];

const queryFn = async () => (await getUser()).data;

const useUserQuery = () => {
  const [storageToken, setStorageToken] = useState<string | null>();
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(async (user) => {
      console.log('change user', user);
      const userToken = await user?.getIdToken();
      console.log(userToken);
      setStorageToken(localStorage.getItem('token'));
      if (userToken) {
        if (userToken !== storageToken) {
          localStorage.setItem('token', userToken);
          await queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        }
      } else {
        localStorage.removeItem('token');
        setStorageToken(null);
        await queryClient.setQueryData(QUERY_KEY, null);
      }
    });

    return unsubscribe;
  }, [queryClient]);

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn,
    staleTime: Infinity,
    enabled: !!storageToken,
  });
};

export default useUserQuery;
