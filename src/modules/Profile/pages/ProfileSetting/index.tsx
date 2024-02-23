import { useNavigate } from 'react-router-dom';
import { logoutWithGoogle } from '../../../../api';
import Button from '../../../../components/Button';
import { Divider } from '@mui/material';
import { ProfileInfoEdit } from '../../components';
import { useUserQuery } from '../../../../hooks';
import { useProfileInfoEdit } from '../../hooks';
import ProfileImageEdit from '../../components/ProfileImageEdit';

const ProfileSetting = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutWithGoogle();
    navigate('/');
  };

  const { mutate, isPending } = useProfileInfoEdit();

  const { data: user } = useUserQuery();

  const handleChangeUser = (data: FormControlData) => {
    mutate(data);
  };

  return (
    <div className='p-4 md:py-8 flex flex-col gap-4'>
      <h3 className='text-4xl font-semibold mb-4'>설정</h3>
      <ProfileImageEdit className='mb-4' />
      <ProfileInfoEdit
        isPending={isPending}
        user={user}
        onSubmit={(data) => handleChangeUser(data)}
      />
      <Divider />
      <Button
        size='large'
        className='w-full'
        variant='contained'
        color='secondary'
        onClick={handleLogout}
      >
        로그아웃
      </Button>
    </div>
  );
};
export default ProfileSetting;
