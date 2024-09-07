'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { createSentence, updateSentence } from '@/lib/actions';
import MaxWidthWrapper from '@components/common/max-width-wrapper';
import BookListItem from '@components/book/book-list-item';
import classes from './index.module.scss';
import BookSearch from '../book-search';
import SentenceInput from '../sentence-input';
import SentenceEditActions from '../sentence-edit-actions';

type SentenceEditContainerProps = {
  sentence?: Sentence;
};

export default function SentenceEditContainer({
  sentence,
}: SentenceEditContainerProps) {
  const router = useRouter();
  const [book, setBook] = useState<Book | undefined>(sentence?.book);
  const [content, setContent] = useState<string>(sentence?.content || '');
  const [pending, setPending] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!book || !content) return;
    setPending(true);

    if (sentence) {
      await updateSentence({ content, book, id: sentence._id });
    } else {
      await createSentence({ content, book });
    }
    setPending(false);
    toast.success(`성공적으로 ${sentence ? '수정' : '작성'}했습니다.`);
    router.back();
  };

  return (
    <MaxWidthWrapper className={classes.wrapper}>
      <BookSearch handleBookSelect={(book) => setBook(book)} />
      {book && (
        <>
          <BookListItem book={book} />
          <SentenceInput
            content={content}
            handleContent={(content) => setContent(content)}
          />
          <SentenceEditActions
            mode={sentence ? 'modify' : 'post'}
            pending={pending}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </MaxWidthWrapper>
  );
}
