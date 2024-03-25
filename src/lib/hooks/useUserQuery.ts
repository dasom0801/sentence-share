import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/store/user';
import { userQueries } from '@/queries';

const useUserQuery = () => {
  const setUser = useUserStore.use.setUser();
  const onSuccess = (user: User) => {
    setUser(user);
  };

  return useQuery(userQueries.me({ onSuccess }));
};

export default useUserQuery;
