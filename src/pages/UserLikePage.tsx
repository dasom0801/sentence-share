/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MaxWidthWrapper } from '@/components';
import { UserLikeContainer } from '@/containers';

const MyLikePage = () => {
  return (
    <main css={styles}>
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
