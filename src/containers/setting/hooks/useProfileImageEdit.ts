import { useEffect, useState } from 'react';
import {
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
  StorageReference,
} from 'firebase/storage';
import { storage } from '../../../lib/firebase.config';
import { toast } from 'react-toastify';
import { getToastConfig } from '../../../utils';
import useProfileInfoEdit from './useProfileInfoEdit';
import { useUserQuery } from '../../../lib/hooks';

const useProfileImageEdit = () => {
  const { data: user } = useUserQuery();
  const { mutate, isPending, data } = useProfileInfoEdit();

  const [imageFile, setImageFile] = useState<File>();

  const resetImage = async () => {
    mutate({ profileUrl: '' });
    deleteOldImage();
  };

  // 이미지 경로를 설정
  const getImageRef = (imageFile: File): StorageReference | null => {
    if (user) {
      const extensions: string = imageFile.name.split('.').slice(-1)[0];
      return ref(storage, `images/${user._id}-${Date.now()}.${extensions}`);
    } else {
      return null;
    }
  };

  // 이전 프로필 이미지를 storage에서 삭제
  const deleteOldImage = async () => {
    if (user) {
      try {
        const oldProfileUrl: string = user.profileUrl;
        const storageRef = ref(storage, oldProfileUrl);
        await deleteObject(storageRef);
      } catch (error) {
        // Do nothing
      }
    }
  };

  useEffect(() => {
    if (imageFile) {
      const uploadImage = async () => {
        try {
          const imageStorage = getImageRef(imageFile);
          if (imageStorage) {
            // 이미지를 업로드 한 다음 이미지 url을 가져온다.
            await uploadBytes(imageStorage, imageFile);
            const url: string = await getDownloadURL(imageStorage);
            mutate({ profileUrl: url });
            deleteOldImage();
          }
        } catch (error) {
          toast.error('이미지 업로드에 실패했습니다.', getToastConfig());
        }
      };

      uploadImage();
    }
  }, [imageFile]);

  return {
    resetImage,
    setImageFile,
    isPending,
    data,
  };
};

export default useProfileImageEdit;
