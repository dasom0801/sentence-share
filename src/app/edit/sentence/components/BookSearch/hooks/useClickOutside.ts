import { useEffect } from 'react';

export function useClickOutside(
  refs: React.RefObject<HTMLElement>[],
  onOutsideClick: () => void,
) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (refs.every((ref) => !ref.current?.contains(event.target as Node))) {
        onOutsideClick();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [refs, onOutsideClick]);
}
