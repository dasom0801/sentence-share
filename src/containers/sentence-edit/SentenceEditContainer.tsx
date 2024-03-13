import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useSentenceQuery from '@/lib/hooks/useSentenceQuery';
import { Spinner } from '@/components';
import BookSearchContainer from './BookSearchContainer';
import SentenceInputContainer from './SentenceInputContainer';

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
    id ? SentenceEditStep.INPUT : SentenceEditStep.SEARCH
  );
  const [content, setContent] = useState<string | undefined>(data?.content);
  const [book, setBook] = useState<Book | undefined>(data?.book);

  useEffect(() => {
    setContent(data?.content);
    setBook(data?.book);
  }, [data]);

  if (!id || (id && data)) {
    if (active === SentenceEditStep.SEARCH) {
      return (
        <BookSearchContainer
          setActive={setActive}
          book={book}
          setBook={setBook}
        />
      );
    }

    if (active === SentenceEditStep.INPUT) {
      return (
        <SentenceInputContainer
          sentenceId={id}
          setActive={setActive}
          setContent={setContent}
          book={book}
          content={content}
        />
      );
    }
  } else {
    return <Spinner />;
  }
};
export default SentenceEditContainer;
