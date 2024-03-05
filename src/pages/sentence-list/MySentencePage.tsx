/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { MaxWidthWrapper } from '../../components';
import { MySentenceContainer } from '../../containers';

const MySentencePage = () => {
  return (
    <main>
      <MaxWidthWrapper styles={wrapperStyles}>
        <MySentenceContainer />
      </MaxWidthWrapper>
    </main>
  );
};

const wrapperStyles = css`
  padding-top: 32px;
  padding-bottom: 32px;
`;

export default MySentencePage;
