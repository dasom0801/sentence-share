'use client';

import { Book, Sentence } from '@/types';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { createSentence, updateSentence } from '../api';

type SentenceEditContextType = {
  book?: Book;
  content: string;
  pending: boolean;

  selectBook: (book: Book) => void;
  updateContent: (content: string) => void;
  setPending: (pending: boolean) => void;
  handleSubmit: () => void;

  mode: 'edit' | 'create';

  initialSentence?: Sentence;
};

export const SentenceEditContext =
  createContext<SentenceEditContextType | null>(null);

type SentenceEditProviderProps = {
  children: ReactNode;
  initialSentence?: Sentence;
};

export function SentenceEditProvider({
  children,
  initialSentence,
}: SentenceEditProviderProps) {
  const router = useRouter();
  const [book, setBook] = useState<Book | undefined>(
    initialSentence?.book || undefined,
  );
  const [content, setContent] = useState<string>(
    initialSentence?.content || '',
  );
  const [pending, setPending] = useState<boolean>(false);

  const selectBook = useCallback((book: Book) => {
    setBook(book);
  }, []);

  const updateContent = useCallback((content: string) => {
    setContent(content);
  }, []);

  const mode = initialSentence ? 'edit' : 'create';

  const handleSubmit = useCallback(async () => {
    if (!book || !content.length) return;
    setPending(true);
    let redirectPath = '/';

    switch (mode) {
      case 'edit':
        await updateSentence({ content, book, id: initialSentence!._id });
        redirectPath = '/my/sentence';
        break;
      case 'create':
        await createSentence({ book, content });
        redirectPath = '/';
        break;
    }

    setPending(false);
    toast.success(`성공적으로 ${mode === 'edit' ? '수정' : '작성'}했습니다.`);
    router.push(redirectPath);
    router.refresh();
  }, []);

  const value: SentenceEditContextType = {
    book,
    content,
    pending,
    selectBook,
    updateContent,
    setPending,
    mode,
    initialSentence,
    handleSubmit,
  };

  return (
    <SentenceEditContext.Provider value={value}>
      {children}
    </SentenceEditContext.Provider>
  );
}

export function useSentenceEdit() {
  const context = useContext(SentenceEditContext);
  if (!context) {
    throw new Error(
      'useSentenceEdit은 SentenceEditProvider와 함께 사용해야 합니다.',
    );
  }
  return context;
}
