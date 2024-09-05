import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useSentenceQuery } from '@/lib/hooks';
import { Spinner } from '@/components';
import BookSearch from './BookSearch';
import SentenceInput from './SentenceInput';

export enum SentenceEditStep {
  SEARCH,
  INPUT,
}

export type SentenceEditDataProps = {
  sentenceId: string | undefined;
  active: SentenceEditStep;
  book: Book | undefined;
  content: string | undefined;
  setActive: Dispatch<SetStateAction<SentenceEditStep>>;
  setBook: Dispatch<SetStateAction<Book | undefined>>;
  setContent: Dispatch<SetStateAction<string | undefined>>;
};

const SentenceEditContainer = () => {
  const { id } = useParams();
  const { data } = useSentenceQuery(id);
  const [active, setActive] = useState<SentenceEditStep>(
    id ? SentenceEditStep.INPUT : SentenceEditStep.SEARCH,
  );
  const [content, setContent] = useState<string | undefined>(data?.content);
  const [book, setBook] = useState<Book | undefined>(data?.book);

  useEffect(
    function updateContent() {
      setContent(data?.content);
    },
    [data?.content],
  );

  useEffect(
    function updateBook() {
      setBook(data?.book);
    },
    [data?.book],
  );

  if (!id || (id && data)) {
    switch (active) {
      case SentenceEditStep.INPUT:
        return (
          <BookSearch setActive={setActive} book={book} setBook={setBook} />
        );
      case SentenceEditStep.SEARCH:
        return (
          <SentenceInput
            sentenceId={id}
            setActive={setActive}
            setContent={setContent}
            book={book}
            content={content}
          />
        );
      default:
        return <></>;
    }
  } else {
    return <Spinner />;
  }
};
export default SentenceEditContainer;
