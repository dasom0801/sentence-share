'use client';

import { useSentenceEdit } from '../../contexts';
import BookListItem from '../BookListItem';
import BookSearch from '../BookSearch';
import SentenceEditActions from '../SentenceEditActions';
import SentenceInput from '../SentenceInput';
import classes from './SentenceEditContent.module.scss';

export default function SentenceEditContent() {
  const { book, content, updateContent } = useSentenceEdit();

  return (
    <div className={classes.wrapper}>
      <BookSearch />
      {book && (
        <>
          <BookListItem book={book} />
          <SentenceInput content={content} handleContent={updateContent} />
          <SentenceEditActions />
        </>
      )}
    </div>
  );
}
