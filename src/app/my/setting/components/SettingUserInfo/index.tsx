'use client';

import { updateUser } from '@/api/user';
import { useUserStore } from '@/store/user';
import { sanitizeInput } from '@/utils/sanitize';
import { Button, FormHelperText, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';
import classes from './SettingUserInfo.module.scss';

export default function SettingUserInfo() {
  const user = useUserStore.use.user();
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
    const sanitizedName = sanitizeInput(name);
    await updateUser({ ...user, name: sanitizedName });
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
