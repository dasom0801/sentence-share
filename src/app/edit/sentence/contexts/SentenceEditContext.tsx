'use client';

import { Book, Sentence } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createSentence, updateSentence } from '../api';
import {
  SentenceEditContextType,
  SentenceEditForm,
  sentenceEditSchema,
} from './types';

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
  const mode = initialSentence ? 'edit' : 'create';
  const [pending, setPending] = useState<boolean>(false);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);

  const methods = useForm<SentenceEditForm>({
    resolver: zodResolver(sentenceEditSchema),
    defaultValues: {
      book: initialSentence?.book ?? (undefined as unknown as Book),
      content: initialSentence?.content || '',
    },
    mode: 'onBlur',
  });
  const {
    watch,
    setValue,
    formState: { errors, isValid },
    handleSubmit: rhfHandleSubmit,
  } = methods;

  const watchedBook = watch('book') as Book | undefined;
  const watchedContent = watch('content');

  const selectBook = useCallback(
    (book: Book) => {
      setValue('book', book, { shouldValidate: true });
    },
    [setValue],
  );

  const updateContent = useCallback(
    (content: string) => {
      setValue('content', content, { shouldValidate: true });
    },
    [setValue],
  );

  const onSubmit = async (data: SentenceEditForm) => {
    setPending(true);
    setShowConfirmAlert(false);
    let redirectPath = '/';

    try {
      if (mode === 'edit' && initialSentence) {
        await updateSentence({ ...data, id: initialSentence._id });
        redirectPath = '/my/sentence';
      } else {
        await createSentence(data);
        redirectPath = '/';
      }

      toast.success(`성공적으로 ${mode === 'edit' ? '수정' : '작성'}했습니다.`);
      router.push(redirectPath);
      router.refresh();
    } catch (error) {
      toast.error('문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setPending(false);
    }
  };

  const handleSubmit = rhfHandleSubmit(() => {
    setShowConfirmAlert(true);
  });

  const confirmSubmit = rhfHandleSubmit(onSubmit);

  const value: SentenceEditContextType = {
    book: watchedBook ?? undefined,
    content: watchedContent,
    pending,
    showConfirmAlert,

    selectBook,
    updateContent,
    handleSubmit,
    submitForm: () => { void confirmSubmit(); },
    setPending,
    setShowConfirmAlert,

    mode,
    initialSentence,

    errors: {
      book: errors.book?.message,
      content: errors.content?.message,
    },
    isValid,
  };

  return (
    <FormProvider {...methods}>
      <SentenceEditContext.Provider value={value}>
        {children}
      </SentenceEditContext.Provider>
    </FormProvider>
  );
}

export function useSentenceEdit() {
  const context = useContext(SentenceEditContext);
  if (context === null) {
    throw new Error(
      'useSentenceEdit은 SentenceEditProvider와 함께 사용해야 합니다.',
    );
  }
  return context;
}
