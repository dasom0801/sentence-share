import type { Meta, StoryObj } from '@storybook/react';
import BookInfoSection from '../book-info-section';
import { MockBook } from '@/mocks/data';

const meta = {
  title: 'book/BookInfoSection',
  component: BookInfoSection,
} satisfies Meta<typeof BookInfoSection>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    book: MockBook,
  },
};
