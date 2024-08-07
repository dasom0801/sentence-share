/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { BiBookHeart } from 'react-icons/bi';
import { colors } from '@mui/material';
import { mq } from '@/styles';
import { memo } from 'react';

const Logo: React.FC = memo(function Logo() {
  return (
    <div css={logoStyle}>
      <BiBookHeart />
      <span>SentenceShare</span>
    </div>
  );
});

const logoStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${colors.blue[800]};

  svg {
    font-size: 24px;
    line-height: 32px;
  }

  span {
    font-size: 18px;
    line-height: 28px;
    font-weight: 600;
  }

  ${mq.md} {
    svg {
      font-size: 30px;
      line-height: 36px;
    }

    span {
      font-size: 20px;
      line-height: 28px;
    }
  }
`;
export default Logo;
