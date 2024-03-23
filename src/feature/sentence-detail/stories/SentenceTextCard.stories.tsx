import type { Meta, StoryObj } from '@storybook/react';
import { MockSentence } from '@/mocks/data';
import SentencTextCard from '../SentenceTextCard';

const meta = {
  title: 'SentenceDetail/SentenceTextCard',
  component: SentencTextCard,
  tags: ['autodocs'],
} satisfies Meta<typeof SentencTextCard>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    sentence: MockSentence,
  },
};

export const Link: Story = {
  args: {
    sentence: MockSentence,
  },
  decorators: [(Story) => <Story />],
};
