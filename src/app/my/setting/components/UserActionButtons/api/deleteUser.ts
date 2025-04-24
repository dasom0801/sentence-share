import { fetchAPI } from '@/api/fetcher';
import { auth } from '@/lib/firebase';
import { signOut } from '@firebase/auth';

const deleteUser = async () => {
  await fetchAPI('/users/withdrawal', { method: 'DELETE' });
  await signOut(auth);
};

export default deleteUser;
