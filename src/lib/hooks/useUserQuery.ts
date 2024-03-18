import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/store/user';
import { getUser } from '../api';

export const QUERY_KEY = ['[GET]/api/user/me'];

const queryFn = async (callback: (user: User) => void) => {
  const user = (await getUser()).data;
  callback(user);
  return user;
};

const useUserQuery = () => {
  const { isLogin, setUser } = useUserStore((state) => state);
  const onSuccess = (user: User) => {
    setUser(user);
  };

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => queryFn(onSuccess),
    enabled: !!isLogin,
  });
};

export default useUserQuery;
