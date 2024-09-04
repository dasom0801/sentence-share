import React from 'react';
import Link from 'next/link';
import UserInfo from '@components/common/user-info';
import classes from './index.module.scss';

type SentenceCardProps = {
  sentence: Sentence;
  showBook?: boolean;
  children?: React.ReactNode;
};

export default function SentenceCard({
  sentence,
  showBook = true,
  children,
}: SentenceCardProps) {
  const { author, book, content, createdAt } = sentence;
  return (
    <div
      className={classes.sentenceCard}
      style={{ backgroundImage: `url(${book?.coverUrl})` }}
    >
      <div className={classes.backdrop}>
        <div className={classes.header}>
          <UserInfo user={author} />
          <time>{createdAt.split('T')[0]}</time>
        </div>

        <Link className={classes.sentence} href={`/sentence/${sentence?._id}`}>
          <p>{content}</p>
        </Link>
        {showBook && (
          <Link className={classes.bookInfo} href={`/book/${book?._id}`}>
            <div>
              <div className={classes.bookTitle}>{book?.title}</div>
              <div>{book?.author.join(',')}</div>
            </div>
            <img src={book?.coverUrl} alt={book?.title} loading="lazy" />
          </Link>
        )}

        <div className={classes.children}>{children}</div>
      </div>
    </div>
  );
}