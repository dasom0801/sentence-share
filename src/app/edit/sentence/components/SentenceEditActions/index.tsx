'use client';

import { AlertDialog } from '@/components/molecules';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSentenceEdit } from '../../contexts';
import classes from './SentenceEditActions.module.scss';

const SentenceEditActions = () => {
  const router = useRouter();
  const { mode, book, content, pending, handleSubmit } = useSentenceEdit();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const isValid = !!book && !!content.length && !pending;

  const handleConfirm = () => {
    if (!isValid) return;
    setShowAlert(false);
    handleSubmit();
  };

  return (
    <>
      <div className={classes.actions}>
        <Button
          variant="outlined"
          color="secondary"
          disabled={!isValid}
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button
          variant="contained"
          disabled={!isValid}
          onClick={() => setShowAlert(true)}
        >
          {mode === 'edit' ? '수정' : '등록'}
        </Button>
      </div>
      <AlertDialog
        open={showAlert}
        content={
          mode === 'edit'
            ? '내용을 수정하시겠습니까?'
            : '작성한 내용을 등록하시겠습니까?'
        }
        confirmLabel={mode === 'edit' ? '수정' : '등록'}
        handleClose={() => setShowAlert(false)}
        handleConfirm={handleConfirm}
      />
    </>
  );
};

export default SentenceEditActions;
