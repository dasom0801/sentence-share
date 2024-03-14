/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { colors, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TbError404 } from 'react-icons/tb';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div css={styles}>
      <TbError404 />
      <div className='title'>페이지를 찾을 수 없습니다.</div>
      <Button
        variant='contained'
        color='secondary'
        onClick={() => navigate(-1)}
      >
        뒤로 가기
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
    color: ${colors.blueGrey[800]};
  }

  .title {
    margin: 0 0 4px;
    font-size: 28px;
    font-weight: 500;
  }
  button {
    margin: 16px 0 0;
  }
`;
export default NotFound;
