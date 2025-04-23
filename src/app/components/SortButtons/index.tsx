'use client';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { memo, MouseEvent, useCallback } from 'react';

import { useSort } from '@/hooks';
import { SortBy, SortOrder } from '@/types/enum';

type SortButtonsType = {
  sorts?: { label: string; value: string }[];
  disabled?: boolean;
};

const defaultSorts: { label: string; value: string }[] = [
  {
    label: '최신순',
    value: `${SortBy.CreatedAt}=${SortOrder.DESC}`,
  },
  {
    label: '인기순',
    value: `${SortBy.Likes}=${SortOrder.DESC}`,
  },
];
const SortButtons: React.FC<SortButtonsType> = memo(function SortButtons({
  sorts = defaultSorts,
  disabled,
}) {
  const { currentSort, setSort } = useSort(
    `${SortBy.CreatedAt}=${SortOrder.DESC}`,
  );

  const handleChange = useCallback(
    (e: MouseEvent<HTMLElement>, value: string) => {
      if (!value) {
        return;
      }
      setSort(value);
    },
    [setSort],
  );

  return (
    <ToggleButtonGroup
      value={currentSort}
      exclusive
      onChange={handleChange}
      aria-label="목록 정렬"
      disabled={disabled}
    >
      {sorts.map(({ label, value }) => (
        <ToggleButton key={value} value={value} size="small">
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
});
export default SortButtons;
