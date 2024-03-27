/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Helmet } from 'react-helmet-async';

import { MaxWidthWrapper } from '@/components';
import UserSentenceContainer from './UserSentenceContainer';

const MySentencePage: React.FC = () => {
  return (
    <main css={styles}>
      <Helmet>
        <title>내가 공유한 문장 - Sentence Share</title>
      </Helmet>
      <MaxWidthWrapper>
        <UserSentenceContainer />
      </MaxWidthWrapper>
    </main>
  );
};

const styles = css`
  padding-top: 36px;
  padding-bottom: 36px;
`;

export default MySentencePage;
