/** @jsxImportSource @emotion/react */

import { useForm, SubmitHandler } from 'react-hook-form';
import { css } from '@emotion/react';
import { Button } from '@mui/material';

import { Input, Spinner } from '..';

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
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<FormControlData>({
    defaultValues: {
      name: user?.name,
    },
  });

  const handleFormSubmit: SubmitHandler<FormControlData> = (
    data: FormControlData
  ) => onSubmit(data);

  return (
    <form css={styles} onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
        color='secondary'
        size='medium'
        label='이름'
        name='name'
        control={control}
        rules={{ required: '값을 입력해주세요.' }}
      />
      <Button
        size='large'
        variant='contained'
        color='primary'
        type='submit'
        disabled={!isValid || loading}
      >
        {loading ? <Spinner /> : '저장'}
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
