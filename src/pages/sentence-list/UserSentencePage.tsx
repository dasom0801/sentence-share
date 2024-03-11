/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { MaxWidthWrapper } from '@/components';
import { UserSentenceContainer } from '@/containers';

const MySentencePage = () => {
  return (
    <main>
      <MaxWidthWrapper styles={wrapperStyles}>
        <UserSentenceContainer />
      </MaxWidthWrapper>
    </main>
  );
};

const wrapperStyles = css`
  padding-top: 32px;
  padding-bottom: 32px;
`;

export default MySentencePage;
