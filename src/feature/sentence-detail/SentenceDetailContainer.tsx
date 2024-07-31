/** @jsxImportSource @emotion/react */

import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { Helmet } from 'react-helmet-async';

import {
  BookInfoSection,
  BookInfoSectionSkeleton,
  MaxWidthWrapper,
  UserInfo,
} from '@/components';
import { useSentenceQuery } from '@/lib/hooks';
import { mq } from '@/styles';
import SentenceRelatedContainer from './SentenceRelatedContainer';
import { memo, useMemo } from 'react';

const SentenceDetailContainer: React.FC = memo(
  function SentenceDetailContainer() {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useSentenceQuery(id);
    const title = useMemo(
      () =>
        !data?.content
          ? ''
          : data.content.length > 15
            ? `${data?.content.slice(0, 15)}... - `
            : data?.content,
      [data],
    );

    if (isError) {
      throw error;
    }

    if (isLoading) {
      return (
        <div>
          <BookInfoSectionSkeleton />
        </div>
      );
    }

    if (data?.book) {
      return (
        <>
          <Helmet>
            <title>{title} Sentence Share</title>
          </Helmet>
          <div css={styles}>
            <BookInfoSection book={data.book} />

            <MaxWidthWrapper className="wrapper">
              <p>{data.content}</p>
              <UserInfo className="user-info" user={data.author} />

              <SentenceRelatedContainer book={data.book} />
            </MaxWidthWrapper>
          </div>
        </>
      );
    }
  },
);

const styles = css`
  .wrapper {
    display: flex;
    flex-direction: column;
    padding-bottom: 32px;

    > p {
      padding: 32px 24px;
      font-size: 20px;
      text-align: center;
    }

    .user-info {
      margin: 0 12px 32px auto;
    }

    ${mq.md} {
      > p {
        padding: 80px 36px;
        font-size: 24px;
      }
      .user-info {
        margin: 0 12px 64px auto;
      }
    }
  }
`;
export default SentenceDetailContainer;
