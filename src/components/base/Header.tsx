import { Link } from 'react-router-dom';
import Logo from './Logo';
import MaxWidthWrapper from '../common/MaxWidthWrapper';
import { Avatar } from '@mui/material';
import { loginWithGoogle } from '../../lib/api';
import { useUserQuery } from '../../lib/hooks';

const Header = () => {
  const { data: currentUser, isLoading } = useUserQuery();

  if (isLoading) {
    return <></>;
  }

  return (
    <div className='border-solid border-b border-secondary-100'>
      <MaxWidthWrapper className='flex justify-between items-center py-3'>
        <Link to={'/'}>
          <Logo />
        </Link>

        {currentUser ? (
          <Link to={'/profile/sentence'} aria-label={currentUser.name}>
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
    </div>
  );
};
export default Header;
