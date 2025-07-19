import { RefObject, useEffect } from 'react';

export function useInfiniteScroll(
  targetRef: RefObject<HTMLElement>,
  callback: () => void,
  options?: IntersectionObserverInit,
) {
  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
        ...options,
      },
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, [targetRef, callback, options]);
}
