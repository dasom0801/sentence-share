'use client';
import { TextField } from '@mui/material';
import { useCallback, useState } from 'react';
import classes from './index.module.scss';

type SentenceInputProps = {
  content: string;
  handleContent: (content: string) => void;
};

const SentenceInput = ({ content, handleContent }: SentenceInputProps) => {
  const [showError, setShowError] = useState<boolean>(false);

  const validateContent = useCallback(() => {
    if (!content || content.length <= 5) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [setShowError, content]);

  return (
    <>
      <TextField
        className={classes.textarea}
        multiline
        placeholder="내용을 입력해주세요."
        value={content}
        rows={4}
        onChange={(e) => handleContent(e.target.value)}
        onBlur={validateContent}
        color={showError ? 'error' : 'primary'}
      />
      {showError && (
        <span className={classes.error}>다섯 글자 이상 입력해 주세요. </span>
      )}
    </>
  );
};

export default SentenceInput;
