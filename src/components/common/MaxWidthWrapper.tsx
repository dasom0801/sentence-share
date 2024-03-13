/** @jsxImportSource @emotion/react */

import { ReactNode } from 'react';
import { SerializedStyles, css } from '@emotion/react';

type MaxWidthWrapperProps = {
  children: ReactNode;
  styles?: SerializedStyles;
  className?: string;
};

const MaxWidthWrapper = ({
  styles,
  children,
  className,
}: MaxWidthWrapperProps) => {
  return (
    <div
      css={css`
        ${maxWidth};
        ${styles};
      `}
      className={className}
    >
      {children}
    </div>
  );
};

const maxWidth = css`
  margin: 0 auto;
  width: 100%;
  max-width: 1280px;
  padding-left: 10px;
  padding-right: 10px;

  @media (min-width: 1024px) {
    padding-left: 80px;
    padding-right: 80px;
  }
`;

export default MaxWidthWrapper;
