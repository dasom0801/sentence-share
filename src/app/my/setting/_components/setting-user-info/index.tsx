'use client';

import { Button, FormHelperText, TextField } from '@mui/material';
import classes from './index.module.scss';
import { FormEvent, useState } from 'react';
import { updateUser } from '@/lib/actions';

type SettingUserInfoProps = {
  user: User;
};

export default function SettingUserInfo({ user }: SettingUserInfoProps) {
  const [name, setName] = useState<string>(user?.name || '');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (value: string) => {
    setName(value);
    validateForm(value);
  };

  const validateForm = (value: string) => {
    if (!value) {
      setError('이름을 입력해주세요.');
      return;
    }
    setError('');
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await updateUser({ ...user, name });
    setLoading(false);
  };

  return (
    <form className={classes.form} onSubmit={(e) => handleFormSubmit(e)}>
      <TextField
        color={error ? 'error' : 'secondary'}
        size="medium"
        label="이름"
        name="name"
        value={name}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={(e) => validateForm(e.target.value)}
      />
      {error && <FormHelperText>값을 입력해주세요.</FormHelperText>}
      <Button
        size="large"
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading || !!error}
      >
        저장
      </Button>
    </form>
  );
}
