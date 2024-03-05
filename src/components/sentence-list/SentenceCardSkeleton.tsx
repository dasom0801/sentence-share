/** @jsxImportSource @emotion/react */

import { Skeleton } from '@mui/material';
import { css } from '@emotion/react';

const SentenceCardSkeleton = () => {
  return (
    <li css={container}>
      <div className='backdrop'>
        <div className='header'>
          <Skeleton variant='circular' width={30} height={30} />
          <Skeleton variant='text' width='40%' sx={{ fontSize: '16px' }} />
        </div>

        <Skeleton sx={{ height: 200 }} variant='rectangular' />
        <div className='book-info'>
          <Skeleton variant='text' width='90%' sx={{ fontSize: '18px' }} />
          <Skeleton variant='text' width='50%' sx={{ fontSize: '16px' }} />
        </div>
      </div>
    </li>
  );
};

export const container = css`
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow: hidden;

  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 16px;
    background-color: white;
  }

  .book-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 16px;
    height: 100px;
  }
`;

export default SentenceCardSkeleton;
