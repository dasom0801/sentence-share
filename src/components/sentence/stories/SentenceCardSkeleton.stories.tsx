import type { Meta, StoryObj } from '@storybook/react';
import SentenceCardSkeleton from '../sentence-card-skeleton';
const meta = {
  title: 'sentence/SentenceCardSkeleton',
  component: SentenceCardSkeleton,
} satisfies Meta<typeof SentenceCardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  decorators: (Story) => {
    return (
      <div style={{ width: '50%', listStyle: 'none' }}>
        <Story />
      </div>
    );
  },
};
