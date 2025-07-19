import { Decorator } from '@storybook/nextjs-vite';
import {
  MockedSentenceEditProvider,
  MockSentenceEditValues,
} from './decorators';

export const withMockedSentenceEditContext = (
  mockValues?: Partial<MockSentenceEditValues>,
): Decorator => {
  return (Story) => (
    <MockedSentenceEditProvider mockValues={mockValues}>
      <Story />
    </MockedSentenceEditProvider>
  );
};
