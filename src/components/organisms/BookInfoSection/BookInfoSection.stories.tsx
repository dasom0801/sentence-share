import { MockBook } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import BookInfoSection from '.';

const meta = {
  title: 'common/organisms/BookInfoSection',
  component: BookInfoSection,
  args: {
    book: MockBook,
  },
} satisfies Meta<typeof BookInfoSection>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: ({ canvas, step }) => {
    step('책 정보가 화면에 렌더링된다.', () => {
      expect(
        canvas.getByRole('heading', { name: MockBook.title }),
      ).toBeInTheDocument();
      expect(canvas.getByText(MockBook.author.join(','))).toBeInTheDocument();
      expect(canvas.getByRole('img')).toHaveAttribute(
        'src',
        expect.stringContaining(MockBook.coverUrl),
      );
    });
  },
};
export const WithChildren: Story = {
  render: (args) => {
    return (
      <BookInfoSection {...args}>
        <p>추가적인 책 정보</p>
      </BookInfoSection>
    );
  },
  play: ({ canvas, step }) => {
    step('children이 화면에 렌더링된다.', () => {
      expect(canvas.getByText('추가적인 책 정보')).toBeInTheDocument();
    });
  },
};
