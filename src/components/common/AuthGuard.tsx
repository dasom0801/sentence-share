import { Outlet } from 'react-router-dom';
import { loginWithGoogle } from '@/lib/api';
import { useUserQuery } from '@/lib/hooks';

const AuthGuard = () => {
  const { data: currentUser, isLoading } = useUserQuery();

  if (isLoading) {
    return <></>;
  }

  if (currentUser) {
    return <Outlet />;
  } else {
    return (
      <button onClick={loginWithGoogle} aria-label='continue with google'>
        <img
          src='/images/google-ctn.svg'
          alt='continue with google'
          aria-hidden='true'
        />
      </button>
    );
  }
};
export default AuthGuard;
