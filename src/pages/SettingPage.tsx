/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MaxWidthWrapper } from '../components';
import { SettingContainer } from '../containers';

const SettingPage = () => {
  return (
    <main>
      <MaxWidthWrapper styles={wrapperStyle}>
        <SettingContainer />
      </MaxWidthWrapper>
    </main>
  );
};

const wrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-top: 32px;
  padding-bottom: 32px;
`;
export default SettingPage;
