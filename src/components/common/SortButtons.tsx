import { MouseEvent } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { useSort } from '@/lib/hooks';
import { getSortByValue, getSortOrderValue } from '@/lib/utils';
import { SortBy, SortOrder } from '@/types/enum';

type SortButtonsType = {
  sorts?: { label: string; value: string }[];
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
const SortButtons: React.FC<SortButtonsType> = ({ sorts = defaultSorts }) => {
  const { sort, setSort } = useSort();

  const handleOnchange = (e: MouseEvent<HTMLElement>, value: string) => {
    if (!value) {
      return;
    }
    const [sortByValue, sortOrderValue] = value.split('=');
    const sortBy: SortBy = getSortByValue(sortByValue);
    const sortOrder: SortOrder = getSortOrderValue(sortOrderValue);
    setSort({ sortBy, sortOrder });
  };

  return (
    <ToggleButtonGroup
      value={`${sort?.sortBy}=${sort?.sortOrder}`}
      exclusive
      onChange={handleOnchange}
      aria-label="목록 정렬"
    >
      {sorts.map(({ label, value }) => (
        <ToggleButton key={value} value={value} size="small">
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
export default SortButtons;
