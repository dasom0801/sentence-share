import { RefObject, useEffect } from 'react';

const useScrollEnd = (
  elementRef: RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const element = elementRef.current;
    const handleScroll = () => {
      if (!element) return;
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        callback();
      }
    };

    if (element) {
      element.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, [elementRef, callback]);
};

export default useScrollEnd;
