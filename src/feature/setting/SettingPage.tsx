/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Helmet } from 'react-helmet-async';
import { MaxWidthWrapper } from '@/components';
import SettingContainer from './SettingContainer';

const SettingPage = () => {
  return (
    <main>
      <Helmet>
        <title>설정 - Sentence Share</title>
      </Helmet>
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
  padding-top: 36px;
  padding-bottom: 36px;
`;
export default SettingPage;
