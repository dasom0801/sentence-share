/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { MaxWidthWrapper } from '../../components';
import { UserLikeContainer } from '../../containers';

const MyLikePage = () => {
  return (
    <main>
      <MaxWidthWrapper styles={wrapperStyles}>
        <UserLikeContainer />
      </MaxWidthWrapper>
    </main>
  );
};

const wrapperStyles = css`
  padding-top: 32px;
  padding-bottom: 32px;
`;
export default MyLikePage;
