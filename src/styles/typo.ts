import { css } from '@emotion/react';

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
