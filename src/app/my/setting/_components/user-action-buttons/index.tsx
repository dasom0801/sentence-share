'use client';

import { Button } from '@mui/material';
import { AlertDialog } from '@/components';
import { deleteUser, logoutWithGoogle } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function UserActionButtons(props: any) {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [pendingDeleteUser, setPendingDeleteUser] = useState<boolean>(false);

  const handleLogout = async () => {
    await logoutWithGoogle();
    router.push('/');
  };

  const handleDeleteUser = async () => {
    setPendingDeleteUser(true);
    await deleteUser();
    toast.success('탈퇴했습니다.');
    router.push('/');
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