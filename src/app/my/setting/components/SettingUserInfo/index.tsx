'use client';

import { useUserStore } from '@/store/user';
import { sanitizeInput } from '@/utils/sanitize';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import classes from './SettingUserInfo.module.scss';
import { useUpdateUserName } from './hooks';

const userInfoSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요.')
    .min(2, '이름은 최소 2자 이상이어야 합니다.')
    .max(10, '이름은 최대 10자까지 입력 가능합니다.')
    .regex(
      /^[a-zA-Z0-9가-힣_]+$/,
      '이름에는 문자, 숫자, 언더바(_)만 사용할 수 있습니다.',
    ),
});
type UserInfoForm = z.infer<typeof userInfoSchema>;

export default function SettingUserInfo() {
  const user = useUserStore.use.user();
  const { updateUserName, isPending } = useUpdateUserName();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserInfoForm>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      name: user?.name || '',
    },
    mode: 'onBlur',
  });

  const onSubmit = ({ name }: UserInfoForm) => {
    if (!user) return;

    const sanitizedName = sanitizeInput(name);
    updateUserName({ ...user, name: sanitizedName });
  };

  const isLoading = isSubmitting || isPending;

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('name')}
        color={errors.name ? 'error' : 'secondary'}
        size="medium"
        label="이름"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Button
        size="large"
        variant="contained"
        color="primary"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? '저장 중...' : '저장'}
      </Button>
    </form>
  );
}
