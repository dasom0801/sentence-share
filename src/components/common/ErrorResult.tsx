/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Button, colors } from '@mui/material';
import { FallbackProps } from 'react-error-boundary';
import { MdErrorOutline } from 'react-icons/md';

const ErrorResult: React.FC<FallbackProps> = ({ resetErrorBoundary }) => {
  return (
    <div css={styles}>
      <MdErrorOutline />
      <div className="title">잠시 후 다시 시도해 주세요.</div>
      <div className="description">요청 사항을 처리하는데 실패했습니다.</div>

      <Button
        variant="contained"
        color="error"
        onClick={() => resetErrorBoundary()}
      >
        다시 시도
      </Button>
    </div>
  );
};

const styles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0;

  svg {
    margin: 0 0 16px;
    font-size: 120px;
    color: ${colors.red[600]};
  }

  .title {
    margin: 0 0 4px;
    font-size: 28px;
    font-weight: 500;
  }

  .description {
    color: ${colors.blueGrey[500]};
  }

  button {
    margin: 16px 0 0;
  }
`;
export default ErrorResult;
