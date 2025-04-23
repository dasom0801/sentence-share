'use client';

import { AlertDialog } from '@/components/molecules';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import classes from './SentenceEditActions.module.scss';

type SentenceEditActionsProps = {
  mode: 'post' | 'modify';
  pending: boolean;
  handleSubmit: () => void;
};

const SentenceEditActions = ({
  mode,
  pending,
  handleSubmit,
}: SentenceEditActionsProps) => {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const handleConfirm = () => {
    setShowAlert(false);
    handleSubmit();
  };

  return (
    <>
      <div className={classes.actions}>
        <Button
          variant="outlined"
          color="secondary"
          disabled={pending}
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button
          variant="contained"
          disabled={pending}
          onClick={() => setShowAlert(true)}
        >
          {mode === 'modify' ? '수정' : '등록'}
        </Button>
      </div>
      <AlertDialog
        open={showAlert}
        content={
          mode === 'modify'
            ? '내용을 수정하시겠습니까?'
            : '작성한 내용을 등록하시겠습니까?'
        }
        confirmLabel={mode === 'modify' ? '수정' : '등록'}
        handleClose={() => setShowAlert(false)}
        handleConfirm={handleConfirm}
      />
    </>
  );
};

export default SentenceEditActions;
