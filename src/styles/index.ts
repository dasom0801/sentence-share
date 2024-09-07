import { css } from '@emotion/react';

// typo
export const pageTitle = css`
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 500;
`;

export const textOverflowHidden = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const lineClamp = (line: number) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${line};
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: break-spaces;
`;

// response
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';
type MediaQuery = Record<Breakpoint, string>;
const breakpoint: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};
export const mq: MediaQuery = Object.entries(breakpoint).reduce(
  (acc, [key, value]) => ({ ...acc, [key]: `@media(min-width: ${value}px)` }),
  {} as MediaQuery,
);

// layout
export const gridContainer = css`
  display: grid;
  min-width: 0;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;

  > * {
    min-width: 0;
  }

  ${mq.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${mq.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// common
export const pagination = css`
  display: flex;
  justify-content: center;
  margin: 40px 0 24px;
`;
