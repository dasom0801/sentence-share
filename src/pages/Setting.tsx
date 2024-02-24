import { useNavigate } from 'react-router-dom';
import { logoutWithGoogle } from '../lib/api';
import Button from '../components/common/Button';
import { Divider } from '@mui/material';
import { useUserQuery } from '../lib/hooks';
import SettingUserImage from '../components/setting/SettingUserImage';
import useProfileInfoEdit from '../containers/setting/hooks/useProfileInfoEdit';
import SettingUserInfo from '../components/setting/SettingUserInfo';

const Setting = () => {
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
      <SettingUserImage className='mb-4' />
      <SettingUserInfo
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
export default Setting;
