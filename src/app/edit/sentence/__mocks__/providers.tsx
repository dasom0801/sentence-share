import { Decorator } from '@storybook/nextjs-vite';
import { useSentenceEdit } from '../contexts';
import {
  MockedSentenceEditProvider,
  MockSentenceEditValues,
} from './decorators';

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const { handleSubmit } = useSentenceEdit();

  return <form onSubmit={handleSubmit}>{children}</form>;
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
