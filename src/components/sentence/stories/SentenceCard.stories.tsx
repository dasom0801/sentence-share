import type { Meta, StoryObj } from '@storybook/react';
import { MockSentence } from '@/mocks/data';
import SentenceCard from '../sentence-card';

const meta = {
  title: 'sentence/SentenceCard',
  component: SentenceCard,
} satisfies Meta<typeof SentenceCard>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    sentence: {
      ...MockSentence,
    },
  },
  decorators: (Story) => {
    return (
      <div style={{ width: '50%', listStyle: 'none' }}>
        <Story />
      </div>
    );
  },
};

export const HideBook: Story = {
  args: {
    sentence: {
      ...MockSentence,
    },
    showBook: false,
  },
  decorators: (Story) => {
    return (
      <div style={{ width: '50%', listStyle: 'none' }}>
        <Story />
      </div>
    );
  },
};
