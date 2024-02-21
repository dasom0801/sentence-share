import { useNavigate } from 'react-router-dom';
import { logoutWithGoogle } from '../../../../api';
import { MaxWidthWrapper } from '../../../../components';
import Button from '../../../../components/Button';

const ProfileSetting = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutWithGoogle();
    navigate('/');
  };

  return (
    <MaxWidthWrapper className='flex flex-col gap-4'>
      <Button
        className='w-full'
        variant='contained'
        color='secondary'
        onClick={handleLogout}
      >
        로그아웃
      </Button>
    </MaxWidthWrapper>
  );
};
export default ProfileSetting;
