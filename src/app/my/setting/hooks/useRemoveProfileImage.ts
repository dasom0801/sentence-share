import { storage } from '@/lib/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { useCallback } from 'react';

const useRemoveProfileImage = () => {
  const removeImage = useCallback(async (url: string) => {
    if (url) {
      try {
        const storageRef = ref(storage, url);
        await deleteObject(storageRef);
      } catch (error) {
        // Do nothing
      }
    }
  }, []);

  return removeImage;
};

export default useRemoveProfileImage;
