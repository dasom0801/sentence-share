'use client';

import { Button } from '@mui/material';
import { useState } from 'react';
import classes from './index.module.scss';
import { useRouter } from 'next/navigation';
import { deleteUserSentence } from '@/lib/actions';
import AlertDialog from '@components/common/alert-dialog';

type MySentenceCardButtonsProps = {
  sentenceId: string;
};

export default function MySentenceCardButtons({
  sentenceId,
}: MySentenceCardButtonsProps) {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const handleDeleteSentence = async () => {
    if (showAlert) {
      await deleteUserSentence(sentenceId);
      setShowAlert(false);
    }
  };

  const handleEditSentence = () => {
    router.push(`/edit/sentence/${sentenceId}`);
  };

  return (
    <>
      <div className={classes.buttons}>
        <Button
          color="secondary"
          size="large"
          sx={{ borderRadius: 0 }}
          onClick={handleEditSentence}
        >
          수정
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ borderRadius: 0 }}
          onClick={() => setShowAlert(true)}
        >
          삭제
        </Button>
      </div>
      <AlertDialog
        content="문장을 삭제하시겠습니까?"
        open={showAlert}
        handleClose={() => setShowAlert(false)}
        handleConfirm={() => handleDeleteSentence()}
      />
    </>
  );
}
