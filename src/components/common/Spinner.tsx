/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { CgSpinner } from 'react-icons/cg';

const Spinner = () => {
  return <CgSpinner css={spinnerStyle} />;
};

const spinnerStyle = css`
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  svg {
    font-size: 30px;
    line-height: 36px;
    animation: spin 1s linear infinite;
  }
`;
export default Spinner;
