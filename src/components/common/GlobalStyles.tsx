/** @jsxImportSource @emotion/react */

import { memo } from 'react';
import { preflight } from '@/styles/preflight';
import { Global, css } from '@emotion/react';

const GlobalStyles: React.FC = memo(function GlobalStyles() {
  const style = css`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap');
    * {
      font-family: 'Noto Sans';
    }
    ${preflight}
  `;
  return <Global styles={style} />;
});
export default GlobalStyles;
