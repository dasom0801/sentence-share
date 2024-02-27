import { DEFAULT_PROFILE } from '../../constants';
import { Button } from '..';
import type { ChangeEvent } from 'react';

type SettingUserImageProps = {
  user: User | undefined;
  loading?: boolean;
  onImageRemove: () => void;
  onImageUpdate: (file: File) => void;
};

const SettingUserImage = ({
  user,
  loading = false,
  onImageRemove,
  onImageUpdate,
}: SettingUserImageProps) => {
  const handleImageUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    if (!!event.target.files?.length) {
      const file = event.target.files[0];
      onImageUpdate(file);
    }
  };

  return (
    <form className={'mx-auto sm:w-1/2'}>
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
          disabled={loading}
          onClick={onImageRemove}
        >
          이미지 삭제
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
            disabled={loading}
            onChange={handleImageUpdate}
          />
          이미지 업로드
        </Button>
      </div>
    </form>
  );
};
export default SettingUserImage;
