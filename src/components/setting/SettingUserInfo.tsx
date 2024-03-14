/** @jsxImportSource @emotion/react */

import { FormEvent, useState } from 'react';
import { css } from '@emotion/react';
import { Button, FormHelperText, TextField } from '@mui/material';

type ProfileInfoEditProp = {
  user: Pick<User, 'name'> | undefined;
  loading?: boolean;
  onSubmit: (data: FormControlData) => void;
};

const SettingUserInfo = ({
  user,
  loading = false,
  onSubmit,
}: ProfileInfoEditProp) => {
  const [name, setName] = useState<string>(user?.name || '');
  const [error, setError] = useState<string>('');

  const handleChange = (value: string) => {
    setName(value);
    if (error) {
      validateForm(value);
    }
  };

  const validateForm = (value: string) => {
    if (!value) {
      setError('이름을 입력해주세요.');
      return;
    }
    setError('');
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ name });
  };

  return (
    <form css={styles} onSubmit={(e) => handleFormSubmit(e)}>
      <TextField
        color={error ? 'error' : 'secondary'}
        size='medium'
        label='이름'
        name='name'
        value={name}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={(e) => validateForm(e.target.value)}
      />
      {error && <FormHelperText>값을 입력해주세요.</FormHelperText>}
      <Button
        size='large'
        variant='contained'
        color='primary'
        type='submit'
        disabled={loading || !!error}
      >
        저장
      </Button>
    </form>
  );
};

const styles = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export default SettingUserInfo;
