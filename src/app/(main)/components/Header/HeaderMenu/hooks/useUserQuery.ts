import { userQueries } from '@/queries';
import { useUserStore } from '@/store/user';
import type { User } from '@/types';
import { useQuery } from '@tanstack/react-query';

const useUserQuery = () => {
  const setUser = useUserStore((state) => state.setUser);
  const onSuccess = (user: User) => {
    setUser(user);
  };

  return useQuery(userQueries.me({ onSuccess }));
};

export default useUserQuery;
