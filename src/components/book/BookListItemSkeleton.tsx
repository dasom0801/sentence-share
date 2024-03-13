/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Skeleton } from '@mui/material';

const BookListItemSkeleton = () => {
  return (
    <li css={styles}>
      <Skeleton variant='rounded' width={82} height={120} />
      <div>
        <Skeleton
          variant='text'
          width='100%'
          sx={{ fontSize: '18px', marginBottom: '8px' }}
        />
        <Skeleton variant='text' width='50%' sx={{ fontSize: '14px' }} />
        <Skeleton variant='text' width='60%' sx={{ fontSize: '14px' }} />
      </div>
    </li>
  );
};

const styles = css`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow: hidden;

  > div {
    flex: 1;
  }
`;
export default BookListItemSkeleton;
