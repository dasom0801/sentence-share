import { css } from '@emotion/react';

export const gridContainer = css`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
