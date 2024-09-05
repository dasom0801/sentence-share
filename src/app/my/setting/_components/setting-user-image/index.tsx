'use client';

import { DEFAULT_PROFILE } from '@/constants';
import { Button } from '@mui/material';
import classes from './index.module.scss';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import {
  useRemoveProfileImage,
  useUploadProfileImage,
} from '@/feature/setting/hooks';
import { updateUser } from '@/lib/actions';

type SettingUserImageProps = {
  user: User;
};

export default function SettingUserImage({ user }: SettingUserImageProps) {
  const uploadProfileImage = useUploadProfileImage();
  const removeProfileImage = useRemoveProfileImage();
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpdate = (event: ChangeEvent<HTMLInputElement>) => {
    if (!!event.target.files?.length) {
      const file = event.target.files[0];
      onImageUpdate(file);
    }
  };

  const onImageUpdate = async (file: File) => {
    if (user) {
      setLoading(true);
      const oldProfileUrl = user.profileUrl;
      const profileUrl = await uploadProfileImage(file);
      await updateUser({ ...user, profileUrl });
      await removeProfileImage(oldProfileUrl);
      setLoading(false);
    }
  };

  const onImageRemove = async () => {
    if (user) {
      setLoading(true);
      const oldProfileUrl = user.profileUrl;
      await updateUser({ ...user, profileUrl: '' });
      await removeProfileImage(oldProfileUrl);
      setLoading(false);
    }
  };

  return (
    <form className={classes.form}>
      <Image
        src={user?.profileUrl || DEFAULT_PROFILE}
        alt="프로필 이미지"
        width={128}
        height={128}
      />

      <div>
        <Button
          variant="outlined"
          color="primary"
          type="button"
          disabled={loading}
          onClick={onImageRemove}
        >
          이미지 삭제
        </Button>

        <Button
          className={classes.file}
          variant="contained"
          color="primary"
          type="button"
          disabled={loading}
        >
          <label htmlFor="profile-upload" />
          <input
            id="profile-upload"
            type="file"
            accept=".png,.jpg,.jpeg"
            disabled={loading}
            onChange={handleImageUpdate}
          />
          이미지 업로드
        </Button>
      </div>
    </form>
  );
}
