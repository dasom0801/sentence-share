/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MaxWidthWrapper } from '@/components';
import { UserSentenceContainer } from '@/containers';

const MySentencePage = () => {
  return (
    <main css={styles}>
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
