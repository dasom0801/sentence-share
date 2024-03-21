import type { Meta, StoryObj } from '@storybook/react';
import SentencTextCard from '../SentenceTextCard';
import { MockSentence } from '@/mocks/data';
import { BrowserRouter } from 'react-router-dom';

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
    enableLink: false,
  },
};

export const Link: Story = {
  args: {
    sentence: MockSentence,
    enableLink: true,
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};