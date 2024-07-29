import { MouseEvent } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { useSort } from '@/lib/hooks';
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
  const { currentSort, setSort } = useSort(
    `${SortBy.CreatedAt}=${SortOrder.DESC}`,
  );

  const handleOnchange = (e: MouseEvent<HTMLElement>, value: string) => {
    if (!value) {
      return;
    }
    setSort(value);
  };

  return (
    <ToggleButtonGroup
      value={currentSort}
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
