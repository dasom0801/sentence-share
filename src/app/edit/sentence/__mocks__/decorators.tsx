import type { Book, Sentence } from '@/types';
import { ReactNode, useState } from 'react';
import { fn } from 'storybook/test';
import { SentenceEditContext } from '../contexts/SentenceEditContext';

export type MockSentenceEditValues = {
  book?: Book;
  content: string;
  pending: boolean;
  showConfirmAlert: boolean;
  mode: 'edit' | 'create';
  initialSentence?: Sentence;
  errors: { book?: string; content?: string };
  isValid: boolean;

  selectBook: ReturnType<typeof fn>;
  updateContent: ReturnType<typeof fn>;
  setPending: ReturnType<typeof fn>;
  setShowConfirmAlert: ReturnType<typeof fn>;
  handleSubmit: ReturnType<typeof fn>;
  submitForm: ReturnType<typeof fn>;
};

export const defaultMockValues: MockSentenceEditValues = {
  book: undefined,
  content: '',
  pending: false,
  showConfirmAlert: false,
  mode: 'create',
  initialSentence: undefined,
  errors: {},
  isValid: false,
  selectBook: fn(),
  updateContent: fn(),
  setPending: fn(),
  setShowConfirmAlert: fn(),
  handleSubmit: fn(),
  submitForm: fn(),
};

export const MockedSentenceEditProvider = ({
  children,
  mockValues,
}: {
  children: ReactNode;
  mockValues?: Partial<MockSentenceEditValues>;
}) => {
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);

  let values = defaultMockValues;
  if (mockValues) {
    values = {
      ...values,
      ...mockValues,
    };
  }

  const enhancedHandleSubmit = fn(async (e?: any) => {
    e?.preventDefault?.();
    await values.handleSubmit(e);
    setShowConfirmAlert(true);
  });

  const enhancedSetShowConfirmAlert = fn((value: boolean) => {
    setShowConfirmAlert(value);
  });

  const enhancedValues = {
    ...values,
    showConfirmAlert,
    setShowConfirmAlert: enhancedSetShowConfirmAlert,
    handleSubmit: enhancedHandleSubmit,
  };

  return (
    <SentenceEditContext.Provider value={enhancedValues}>
      {children}
    </SentenceEditContext.Provider>
  );
};
