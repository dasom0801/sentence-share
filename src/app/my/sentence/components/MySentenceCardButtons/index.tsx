'use client';

import { AlertDialog } from '@/components/molecules';
import { Button } from '@mui/material';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import classes from './MySentenceCardButtons.module.scss';
import { deleteSentence } from './api';

type MySentenceCardButtonsProps = {
  sentenceId: string;
};

export default function MySentenceCardButtons({
  sentenceId,
}: MySentenceCardButtonsProps) {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  // TODO: hook으로 분리 + useMutation으로 onSuccess, onError 처리
  const handleDeleteSentence = async () => {
    if (showAlert) {
      await deleteSentence(sentenceId);
      setShowAlert(false);
      router.refresh();
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
