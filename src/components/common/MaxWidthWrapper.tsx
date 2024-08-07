/** @jsxImportSource @emotion/react */

import { memo, PropsWithChildren } from 'react';
import { SerializedStyles, css } from '@emotion/react';
import { mq } from '@/styles';

type MaxWidthWrapperProps = PropsWithChildren<{
  styles?: SerializedStyles;
  className?: string;
}>;

const MaxWidthWrapper: React.FC<MaxWidthWrapperProps> = memo(
  function MaxWidthWrapper({ styles, children, className }) {
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
  },
);

const maxWidth = css`
  margin: 0 auto;
  width: 100%;
  max-width: 1280px;
  padding-left: 10px;
  padding-right: 10px;

  ${mq.lg} {
    padding-left: 80px;
    padding-right: 80px;
  }
`;

export default MaxWidthWrapper;
