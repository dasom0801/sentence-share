/** @jsxImportSource @emotion/react */

import { DEFAULT_PROFILE } from '../../constants';
import { Button } from '..';
import type { ChangeEvent } from 'react';
import { css } from '@emotion/react';

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
    <form css={styles}>
      <img src={user?.profileUrl || DEFAULT_PROFILE} alt='프로필 이미지' />

      <div>
        <Button
          variant='outlined'
          color='primary'
          type='button'
          disabled={loading}
          onClick={onImageRemove}
        >
          이미지 삭제
        </Button>

        <Button
          className='file'
          variant='contained'
          color='primary'
          type='button'
        >
          <label htmlFor='profile-upload' />
          <input
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

const styles = css`
  margin: 0 auto;

  img {
    margin: 0 auto 32px;
    width: 128px;
    height: 128px;
    border-radius: 100%;
  }

  > div {
    display: flex;
    gap: 16px;

    button {
      flex: 1;
    }

    .file {
      position: relative;
    }

    label {
      position: absolute;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    input {
      display: none;
    }
  }
  @media (min-width: 640px) {
    width: 50%;
  }
`;

export default SettingUserImage;
