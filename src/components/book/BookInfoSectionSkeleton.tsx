/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Skeleton, colors } from '@mui/material';

const BookInfoSectionSkeleton = () => {
  return (
    <div css={styles}>
      <Skeleton className='image' variant='rounded' width={180} height={260} />
      <Skeleton
        className='title'
        variant='text'
        width='50%'
        sx={{ fontSize: '20px' }}
      />
      <Skeleton variant='text' width='25%' sx={{ fontSize: '16px' }} />
    </div>
  );
};

const styles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  height: 419px;
  background-color: ${colors.blueGrey[50]};
  .image {
    margin: 0 0 16px;
  }

  .title {
    margin: 0 0 8px;
  }
`;
export default BookInfoSectionSkeleton;
