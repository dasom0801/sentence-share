import { DEFAULT_PROFILE } from '../../constants';
import { Button, Spinner } from '..';
import { ChangeEvent } from 'react';
import useProfileImageEdit from '../../containers/setting/hooks/useProfileImageEdit';
import { useUserQuery } from '../../lib/hooks';
import { cn } from '../../utils';

const SettingUserImage = ({ className }: { className?: string }) => {
  const { data: user } = useUserQuery();
  const { setImageFile, resetImage, isPending } = useProfileImageEdit();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!!event.target.files?.length) {
      const file = event.target.files[0];
      setImageFile(file);
    }
  };

  return (
    <form className={cn('mx-auto sm:w-1/2', className)}>
      <img
        className='mx-auto w-32 h-32 rounded-full mb-8'
        src={user?.profileUrl || DEFAULT_PROFILE}
        alt='프로필 이미지'
      />

      <div className='flex gap-4'>
        <Button
          className='flex-1'
          variant='outlined'
          color='primary'
          type='button'
          onClick={resetImage}
        >
          {isPending ? <Spinner /> : '이미지 삭제'}
        </Button>

        <Button
          className='relative flex-1'
          variant='contained'
          color='primary'
          type='button'
        >
          <label
            className='cursor-pointer absolute w-full h-full'
            htmlFor='profile-upload'
          />
          <input
            className='hidden'
            id='profile-upload'
            type='file'
            accept='.png,.jpg,.jpeg'
            onChange={handleFileChange}
          />
          {isPending ? <Spinner /> : '이미지 업로드'}
        </Button>
      </div>
    </form>
  );
};
export default SettingUserImage;
