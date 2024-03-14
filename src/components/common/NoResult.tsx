/** @jsxImportSource @emotion/react */
import { ReactNode } from 'react';
import { css } from '@emotion/react';
import { colors } from '@mui/material';
import { TbZoomQuestion } from 'react-icons/tb';

type NoResultProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
};

const NoResult = ({
  title = '결과가 없습니다.',
  description,
  children,
}: NoResultProps) => {
  return (
    <div css={styles}>
      <TbZoomQuestion />
      <div className='title'>{title}</div>
      {description && <div className='description'>{description}</div>}

      {children && <div className='actions'>{children}</div>}
    </div>
  );
};

const styles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    margin: 0 0 16px;
    font-size: 120px;
    color: ${colors.blueGrey[800]};
  }

  .title {
    margin: 0 0 4px;
    font-size: 28px;
    font-weight: 500;
  }

  .description {
    color: ${colors.blueGrey[500]};
  }

  .actions {
    margin: 16px 0 0;
  }
`;
export default NoResult;
