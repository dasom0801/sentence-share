'use client';

import { MaxWidthWrapper } from '@/components/atoms';
import type { Book, Sentence } from '@/types';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

import BookListItem from '../BookListItem';
import BookSearch from '../BookSearch';
import SentenceEditActions from '../SentenceEditActions';
import SentenceInput from '../SentenceInput';
import classes from './SentenceEditContainer.module.scss';
import { createSentence, updateSentence } from './api';

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
      await createSentence({ book, content });
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
