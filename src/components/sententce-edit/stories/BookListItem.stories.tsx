import type { Meta, StoryObj } from '@storybook/react';
import BookListItem from '../BookListItem';
import { MockBook } from '@/test-utils/index.mock';

const meta = {
  title: 'SentenceEdit/BookListItem',
  component: BookListItem,
  tags: ['autodocs'],
} satisfies Meta<typeof BookListItem>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    book: MockBook,
    onClick: () => console.log('click'),
  },
  decorators: [
    (Story) => (
      <ul>
        <Story />
      </ul>
    ),
  ],
};
