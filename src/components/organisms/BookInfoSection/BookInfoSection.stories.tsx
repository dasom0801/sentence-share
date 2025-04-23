import { MockBook } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/react';
import BookInfoSection from '.';

const meta = {
  title: 'common/organisms/BookInfoSection',
  component: BookInfoSection,
} satisfies Meta<typeof BookInfoSection>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    book: MockBook,
  },
};
