import { Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useUserQuery, logoutWithGoogle } from '@/lib';
import { SettingUserImage, SettingUserInfo } from '@/components';
import {
  useRemoveProfileImage,
  useUpdateProfile,
  useUploadProfileImage,
} from './hooks';

const SettingContainer = () => {
  const navigate = useNavigate();
  const { data: user } = useUserQuery();
  const uploadProfileImage = useUploadProfileImage();
  const removeProfileImage = useRemoveProfileImage();
  const { mutate, isPending: loadingInfoUpdate } = useUpdateProfile();

  const handleLogout = async () => {
    await logoutWithGoogle();
    navigate('/');
  };

  const handleImageRemove = () => {
    if (user) {
      const oldProfileUrl = user.profileUrl;
      mutate({ ...user, profileUrl: '' });
      removeProfileImage(oldProfileUrl);
    }
  };

  const handleImageUpdate = async (file: File) => {
    if (user) {
      const oldProfileUrl = user.profileUrl;
      const profileUrl = await uploadProfileImage(file);
      mutate({ ...user, profileUrl });
      removeProfileImage(oldProfileUrl);
    }
  };

  return (
    <>
      <SettingUserImage
        user={user}
        loading={loadingInfoUpdate}
        onImageRemove={handleImageRemove}
        onImageUpdate={handleImageUpdate}
      />
      <SettingUserInfo
        loading={loadingInfoUpdate}
        user={user}
        onSubmit={(data) => mutate(data)}
      />
      <Divider />
      <Button
        size='large'
        variant='contained'
        color='secondary'
        onClick={handleLogout}
      >
        로그아웃
      </Button>
    </>
  );
};

export default SettingContainer;
