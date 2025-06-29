import { MockSentence } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/nextjs';
import SentenceCard from '.';

const meta = {
  title: 'common/organisms/SentenceCard',
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
