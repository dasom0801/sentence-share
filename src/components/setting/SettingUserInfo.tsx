import { useForm, SubmitHandler } from 'react-hook-form';
import { Input, Button, Spinner } from '..';

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
    <form
      className='flex flex-col gap-2'
      onSubmit={handleSubmit(handleFormSubmit)}
    >
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
export default SettingUserInfo;
