/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { MaxWidthWrapper } from '@/components';
import SentenceListContainer from './SentenceListContainer';

const MainPage: React.FC = () => {
  return (
    <main css={styles}>
      <MaxWidthWrapper>
        <SentenceListContainer />
      </MaxWidthWrapper>
    </main>
  );
};

const styles = css`
  padding-top: 36px;
  padding-bottom: 36px;
`;
export default MainPage;
