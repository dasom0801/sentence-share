import { MockBooks, MockSentence } from '@/mocks/data';

export const empty = {
  book: undefined,
  content: '',
  pending: false,
  mode: 'create' as const,
  isValid: false,
  errors: {},
};

export const valid = {
  book: MockBooks[0],
  content: 'Valid Status Example',
  pending: false,
  mode: 'create' as const,
  isValid: true,
  errors: {},
};

export const edit = {
  book: MockSentence.book,
  content: 'Edit Sentence',
  pending: false,
  mode: 'edit' as const,
  initialSentence: MockSentence,
  isValid: true,
  errors: {},
};

export const pending = {
  book: MockBooks[0],
  content: 'Pending Status Example',
  pending: true,
  mode: 'create' as const,
  isValid: false,
  errors: {},
};
