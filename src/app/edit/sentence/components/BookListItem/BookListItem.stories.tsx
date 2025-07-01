import { MockBook } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BookListItem from '.';

const meta = {
  title: 'page/edit/BookListItem',
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
