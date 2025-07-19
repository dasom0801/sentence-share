import { MockBook } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import BookSearchResults from '.';

const meta = {
  title: 'page/edit/sentence/BookSearchResults',
  component: BookSearchResults,
  args: {
    books: Array.from({ length: 5 }, (_, id) => ({
      ...MockBook,
      _id: id.toString(),
    })),
    isLoading: false,
    onBookSelect: fn(),
    onFetchNextPage: fn(),
  },
} satisfies Meta<typeof BookSearchResults>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const Loading: Story = {
  args: {
    ...Default.args,
    books: [],
    isLoading: true,
  },
};
