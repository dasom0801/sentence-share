import { Link } from 'react-router-dom';
import Logo from '../Logo';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { Avatar } from '@mui/material';
import { loginWithGoogle } from '../../api';
import { useUserQuery } from '../../hooks';

const Header = () => {
  const { data: currentUser, isLoading } = useUserQuery();

  if (isLoading) {
    return <></>;
  }

  return (
    <MaxWidthWrapper className='flex justify-between items-center py-2'>
      <Link to={'/'}>
        <Logo />
      </Link>
      {currentUser ? (
        <Link to={'/profile'} aria-label={currentUser.name}>
          <Avatar alt={currentUser.name} src={currentUser.profileUrl} />
        </Link>
      ) : (
        <button onClick={loginWithGoogle} aria-label='continue with google'>
          <img
            src='/images/google-ctn.svg'
            alt='continue with google'
            aria-hidden='true'
          />
        </button>
      )}
    </MaxWidthWrapper>
  );
};
export default Header;
