import { Decorator } from '@storybook/nextjs-vite';
import { FormEventHandler, ReactNode } from 'react';
import { useSentenceEdit } from '../contexts';
import {
  MockedSentenceEditProvider,
  MockSentenceEditValues,
} from './decorators';

const FormWrapper = ({ children }: { children: ReactNode }) => {
  const { handleSubmit } = useSentenceEdit();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      {children}
    </form>
  );
};

export const withMockedSentenceEditContext = (
  mockValues?: Partial<MockSentenceEditValues>,
): Decorator => {
  return (Story) => (
    <MockedSentenceEditProvider mockValues={mockValues}>
      <FormWrapper>
        <Story />
      </FormWrapper>
    </MockedSentenceEditProvider>
  );
};
