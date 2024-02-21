import { useForm, SubmitHandler } from 'react-hook-form';
import { Input, Button } from '../../../../components';

type ProfileInfoEditProp = {
  user: Pick<User, 'name'> | undefined;
  onSubmit: (data: FormControlData) => void;
};

const ProfileInfoEdit = ({ user, onSubmit }: ProfileInfoEditProp) => {
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
        disabled={!isValid}
      >
        저장
      </Button>
    </form>
  );
};
export default ProfileInfoEdit;
