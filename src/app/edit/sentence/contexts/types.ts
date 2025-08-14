import { Book, Sentence } from '@/types';
import { z } from 'zod';

const bookSchema = z.object({
  _id: z.string().min(1, '책 ID가 필요합니다.'),
  title: z.string().min(1, '책 제목이 필요합니다.'),
  coverUrl: z.string().min(1, '표지 URL이 필요합니다.'),
  publisher: z.string().min(1, '출판사가 필요합니다.'),
  author: z.array(z.string().min(1)).min(1, '저자가 필요합니다.'),
  isbn: z.string().min(1, 'ISBN이 필요합니다.'),
  sentence: z.array(z.any()).optional(),
  publishedAt: z.date().optional(),
}) satisfies z.ZodType<Book>;

export const sentenceEditSchema = z.object({
  book: bookSchema.refine((val) => val !== undefined, {
    message: '책을 선택해주세요.',
  }),
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
