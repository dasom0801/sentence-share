import type { Meta, StoryObj } from '@storybook/react';
import SentenceCard from '../SentenceCard';
import { MockSentence } from '@/mocks/data';
import { BrowserRouter } from 'react-router-dom';
const meta = {
  title: 'sentence/SentenceCard',
  component: SentenceCard,
  tags: ['autodocs'],
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
      <BrowserRouter>
        <div style={{ width: '50%', listStyle: 'none' }}>
          <Story />
        </div>
      </BrowserRouter>
    );
  },
};
