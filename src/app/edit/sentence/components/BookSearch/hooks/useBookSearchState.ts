import { sanitizeInput } from '@/utils/sanitize';
import { useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type BookSearchState = {
  focused: boolean;
  search: string;
  input: string;
  shouldShowList: boolean;

  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  clearSearch: () => void;
};

export const useBookSearchState = (): BookSearchState => {
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState('');
  const [input, setInput] = useState('');

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(sanitizeInput(value));
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
      debouncedSearch(e.target.value);
    },
    [debouncedSearch],
  );

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const clearSearch = useCallback(() => {
    setFocused(false);
    setSearch('');
    setInput('');
  }, []);

  const shouldShowList = focused && search.length > 0;

  return {
    focused,
    search,
    input,
    handleInputChange,
    handleFocus,
    handleBlur,
    clearSearch,
    shouldShowList,
  };
};
