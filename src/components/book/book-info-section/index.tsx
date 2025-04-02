import type { Book } from '@/types';
import Image from 'next/image';
import { ReactNode } from 'react';
import classes from './index.module.scss';

type BookInfoSectionProps = {
  book: Book;
  children?: ReactNode;
};

export default function BookInfoSection({
  book,
  children,
}: BookInfoSectionProps) {
  return (
    <section
      className={classes.bookInfoSection}
      style={{ backgroundImage: `url(${book?.coverUrl})` }}
    >
      <div className={classes.backdrop}>
        <Image
          className={classes.image}
          src={book?.coverUrl}
          alt={book?.title}
          width={180}
          height={0}
        />
        <h2 className={classes.title}>{book?.title}</h2>
        <div>{book?.author.join(',')}</div>

        {children}
      </div>
    </section>
  );
}
