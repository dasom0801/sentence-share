import { MockBook } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn } from 'storybook/test';
import BookSearchList from '.';

const meta = {
  title: 'page/edit/sentence/BookSearchList',
  component: BookSearchList,
} satisfies Meta<typeof BookSearchList>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    books: Array.from({ length: 5 }, (_, id) => ({
      ...MockBook,
      _id: id.toString(),
    })),
    handleOnClickBook: fn(),
  },
  play: async ({ canvas, step, userEvent, args }) => {
    const allListitems = canvas.getAllByRole('listitem');
    await step('books 배열 길이 만큼 렌더링한다', () => {
      expect(allListitems.length).toEqual(args.books.length);
    });
    await step('listitem을 클릭하면 handleOnClickBook을 클릭한다.', () => {
      allListitems.forEach(async (listitem) => {
        await userEvent.click(listitem);
        expect(args.handleOnClickBook).toHaveBeenCalled();
      });
    });
  },
};
