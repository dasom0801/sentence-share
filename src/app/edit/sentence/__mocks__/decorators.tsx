import type { Book, Sentence } from '@/types';
import { ReactNode } from 'react';
import { fn } from 'storybook/test';
import { SentenceEditContext } from '../contexts/SentenceEditContext';

export type MockSentenceEditValues = {
  book?: Book;
  content: string;
  pending: boolean;
  mode: 'edit' | 'create';
  initialSentence?: Sentence;

  selectBook: ReturnType<typeof fn>;
  updateContent: ReturnType<typeof fn>;
  setPending: ReturnType<typeof fn>;
  handleSubmit: ReturnType<typeof fn>;
};

export const defaultMockValues: MockSentenceEditValues = {
  book: undefined,
  content: '',
  pending: false,
  mode: 'create',
  initialSentence: undefined,
  selectBook: fn(),
  updateContent: fn(),
  setPending: fn(),
  handleSubmit: fn(),
};

export const MockedSentenceEditProvider = ({
  children,
  mockValues,
}: {
  children: ReactNode;
  mockValues?: Partial<MockSentenceEditValues>;
}) => {
  let values = defaultMockValues;
  if (mockValues) {
    values = {
      ...values,
      ...mockValues,
    };
  }

  return (
    <SentenceEditContext.Provider value={values}>
      {children}
    </SentenceEditContext.Provider>
  );
};
