/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Helmet } from 'react-helmet-async';
import { MaxWidthWrapper } from '@/components';
import { UserLikeContainer } from '@/containers';

const MyLikePage = () => {
  return (
    <main css={styles}>
      <Helmet>
        <title>내가 좋아한 문장 - Sentence Share</title>
      </Helmet>
      <MaxWidthWrapper>
        <UserLikeContainer />
      </MaxWidthWrapper>
    </main>
  );
};

const styles = css`
  padding-top: 36px;
  padding-bottom: 36px;
`;

export default MyLikePage;
