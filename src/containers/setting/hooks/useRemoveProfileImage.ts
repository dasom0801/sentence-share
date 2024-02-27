import { useCallback } from 'react';
import { storage } from '../../../lib/firebase.config';
import { deleteObject, ref } from 'firebase/storage';

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
