import { MockBook } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import BookListItem from '.';

const meta = {
  title: 'page/edit/sentence/BookListItem',
  component: BookListItem,
} satisfies Meta<typeof BookListItem>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    book: MockBook,
  },
  play: async ({ canvas }) => {
    expect(canvas.getByText(MockBook.title)).toBeInTheDocument();
    expect(canvas.getByText(MockBook.author.join(','))).toBeInTheDocument();
    expect(canvas.getByText(MockBook.publisher)).toBeInTheDocument();
  },
};
