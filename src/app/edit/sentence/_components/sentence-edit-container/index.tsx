'use client';

import { updateSentence } from '@/lib/actions';
import { fetchAPI } from '@/lib/api/api';
import type { Book, Sentence } from '@/types';
import BookListItem from '@components/book/book-list-item';
import MaxWidthWrapper from '@components/common/max-width-wrapper';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import BookSearch from '../book-search';
import SentenceEditActions from '../sentence-edit-actions';
import SentenceInput from '../sentence-input';
import classes from './index.module.scss';

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
    let redirectPath = '/';

    if (sentence) {
      await updateSentence({ content, book, id: sentence._id });
      redirectPath = '/my/sentence';
    } else {
      await fetchAPI('/sentences', {
        method: 'POST',
        body: JSON.stringify({ book, content }),
      });
      redirectPath = '/';
    }
    setPending(false);
    toast.success(`성공적으로 ${sentence ? '수정' : '작성'}했습니다.`);
    router.push(redirectPath);
    router.refresh();
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
