import type { Meta, StoryObj } from '@storybook/nextjs';
import SentenceCardSkeleton from '.';
const meta = {
  title: 'common/organisms/SentenceCardSkeleton',
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
