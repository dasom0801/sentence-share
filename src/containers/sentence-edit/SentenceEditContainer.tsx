import { Dispatch, SetStateAction, createContext, useState } from 'react';
import BookSearchContainer from './BookSearchContainer';
import SentenceInputContainer from './SentenceInputContainer';

type SentenceEditStep = 'search' | 'input';

type ContextProps = {
  active: SentenceEditStep;
  book: Book | null;
  setActive: Dispatch<SetStateAction<SentenceEditStep>>;
  setBook: Dispatch<SetStateAction<Book | null>>;
};

export const SentenceEditContenxt = createContext<ContextProps>({
  active: 'search',
  book: null,
  setActive: () => {},
  setBook: () => {},
});

const SentenceEditContainer = () => {
  const [active, setActive] = useState<SentenceEditStep>('search');
  const [book, setBook] = useState<Book | null>(null);

  return (
    <SentenceEditContenxt.Provider value={{ active, book, setActive, setBook }}>
      {active === 'search' ? (
        <BookSearchContainer />
      ) : (
        <SentenceInputContainer />
      )}
    </SentenceEditContenxt.Provider>
  );
};
export default SentenceEditContainer;
