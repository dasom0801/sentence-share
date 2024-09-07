import type { Meta, StoryObj } from '@storybook/react';
import BookListItem from '../book-list-item';
import { MockBook } from '@/mocks/data';

const meta = {
  title: 'book/BookListItem',
  component: BookListItem,
} satisfies Meta<typeof BookListItem>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    book: MockBook,
  },
  decorators: [
    (Story) => (
      <ul>
        <Story />
      </ul>
    ),
  ],
};
