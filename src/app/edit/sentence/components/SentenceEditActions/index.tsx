'use client';

import { AlertDialog } from '@/components/molecules';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSentenceEdit } from '../../contexts';
import classes from './SentenceEditActions.module.scss';

const SentenceEditActions = () => {
  const router = useRouter();
  const {
    mode,
    pending,
    isValid,
    submitForm,
    showConfirmAlert,
    setShowConfirmAlert,
  } = useSentenceEdit();

  const handleConfirm = () => {
    setShowConfirmAlert(false);
    submitForm();
  };

  return (
    <>
      <div className={classes.actions}>
        <Button
          variant="outlined"
          color="secondary"
          disabled={!isValid || pending}
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={!isValid || pending}
        >
          {pending ? '처리 중...' : mode === 'edit' ? '수정' : '등록'}
        </Button>
      </div>
      <AlertDialog
        open={showConfirmAlert}
        content={
          mode === 'edit'
            ? '내용을 수정하시겠습니까?'
            : '작성한 내용을 등록하시겠습니까?'
        }
        confirmLabel={mode === 'edit' ? '수정' : '등록'}
        handleClose={() => setShowConfirmAlert(false)}
        handleConfirm={handleConfirm}
      />
    </>
  );
};

export default SentenceEditActions;
