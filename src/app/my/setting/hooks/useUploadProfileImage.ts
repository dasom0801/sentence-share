import { storage } from '@/lib/firebase.config';
import { useUserStore } from '@/store/user';
import type { User } from '@/types';
import {
  StorageReference,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

const useUploadProfileImage = () => {
  const user = useUserStore.use.user();

  // 이미지 경로를 설정
  const getImageRef = ({
    file,
    user,
  }: {
    file: File;
    user: User | undefined;
  }): StorageReference | null => {
    if (user) {
      const extensions: string = file.name.split('.').slice(-1)[0];
      return ref(storage, `images/${user._id}-${Date.now()}.${extensions}`);
    } else {
      return null;
    }
  };

  const uploadImage = useCallback(
    async (file: File) => {
      try {
        if (user) {
          const imageStorage = getImageRef({ file, user });
          if (imageStorage) {
            await uploadBytes(imageStorage, file);
            const url: string = await getDownloadURL(imageStorage);
            return url;
          } else {
            throw new Error('이미지 업로드에 실패했습니다.');
          }
        }
      } catch (error) {
        toast.error('이미지 업로드에 실패했습니다.');
      }
    },
    [user],
  );

  return uploadImage;
};

export default useUploadProfileImage;
