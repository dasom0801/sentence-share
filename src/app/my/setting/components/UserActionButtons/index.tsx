'use client';

import { AlertDialog } from '@/components/molecules';
import { Button } from '@mui/material';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { deleteUser } from './api';

import { useLogout } from '@/hooks';

export default function UserActionButtons() {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [pendingDeleteUser, setPendingDeleteUser] = useState<boolean>(false);
  const { mutate: logout } = useLogout();

  const handleLogout = async () => {
    logout();
  };

  const handleDeleteUser = async () => {
    setPendingDeleteUser(true);
    await deleteUser();
    toast.success('탈퇴했습니다.');
    router.push('/');
    router.refresh();
  };

  return (
    <>
      <Button
        size="large"
        variant="contained"
        color="secondary"
        onClick={handleLogout}
      >
        로그아웃
      </Button>

      <Button
        size="large"
        variant="contained"
        color="error"
        disabled={pendingDeleteUser}
        onClick={() => setShowAlert(true)}
      >
        회원탈퇴
      </Button>
      <AlertDialog
        open={showAlert}
        content="탈퇴하시겠습니까?"
        confirmLabel="탈퇴"
        handleClose={() => setShowAlert(false)}
        handleConfirm={handleDeleteUser}
      />
    </>
  );
}
