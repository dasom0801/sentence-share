import { Book, Sentence } from '@/types';
import { z } from 'zod';

export const sentenceEditSchema = z.object({
  book: z.custom<Book>(
    (val) => {
      return val && typeof val === 'object';
    },
    { message: '책을 선택해주세요.' },
  ),
  content: z.string().min(5, '다섯 글자 이상 입력해주세요.'),
});

export type SentenceEditForm = z.infer<typeof sentenceEditSchema>;

export type SentenceEditContextType = {
  book?: Book;
  content: string;
  pending: boolean;
  showConfirmAlert: boolean;

  selectBook: (book: Book) => void;
  updateContent: (content: string) => void;
  setPending: (pending: boolean) => void;
  setShowConfirmAlert: (show: boolean) => void;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  submitForm: () => Promise<void>;

  mode: 'edit' | 'create';
  initialSentence?: Sentence;

  errors: { book?: string; content?: string };
  isValid: boolean;
};
