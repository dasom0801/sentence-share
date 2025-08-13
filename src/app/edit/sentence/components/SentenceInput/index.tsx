'use client';
import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { SentenceEditForm } from '../../contexts/types';
import classes from './SentenceInput.module.scss';

const SentenceInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SentenceEditForm>();

  return (
    <TextField
      {...register('content')}
      className={classes.textarea}
      multiline
      placeholder="내용을 입력해주세요."
      rows={4}
      error={!!errors?.content}
      helperText={errors?.content?.message}
    />
  );
};

export default SentenceInput;
