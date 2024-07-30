/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { colors } from '@mui/material';
import { memo } from 'react';
import { CiImageOn } from 'react-icons/ci';

const BookDefaultCover: React.FC = memo(function BookDefaultCover() {
  return (
    <div css={styles} aria-hidden={true}>
      <CiImageOn />
    </div>
  );
});

const styles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 83px;
  height: 120px;
  background-color: ${colors.grey[50]};
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  svg {
    width: 60px;
    height: 60px;
    color: ${colors.grey[900]};
  }
`;

export default BookDefaultCover;
