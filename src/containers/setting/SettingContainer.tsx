import { useState } from 'react';
import { Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useUserQuery, logoutWithGoogle } from '@/lib';
import { AlertDialog, SettingUserImage, SettingUserInfo } from '@/components';
import {
  useRemoveProfileImage,
  useUpdateProfile,
  useUploadProfileImage,
  useDeleteUser,
} from './hooks';

const SettingContainer = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { data: user } = useUserQuery();
  const uploadProfileImage = useUploadProfileImage();
  const removeProfileImage = useRemoveProfileImage();
  const { mutate, isPending: loadingInfoUpdate } = useUpdateProfile();
  const { mutate: deleteUser, isPending: pendingDeleteUser } = useDeleteUser();

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
        loading={loadingInfoUpdate || pendingDeleteUser}
        onImageRemove={handleImageRemove}
        onImageUpdate={handleImageUpdate}
      />
      <SettingUserInfo
        loading={loadingInfoUpdate || pendingDeleteUser}
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

      <Button
        size='large'
        variant='contained'
        color='error'
        disabled={pendingDeleteUser}
        onClick={() => setShowAlert(true)}
      >
        회원탈퇴
      </Button>
      <AlertDialog
        open={showAlert}
        content='탈퇴하시겠습니까?'
        confirmLabel='탈퇴'
        handleClose={() => setShowAlert(false)}
        handleConfirm={deleteUser}
      />
    </>
  );
};

export default SettingContainer;
