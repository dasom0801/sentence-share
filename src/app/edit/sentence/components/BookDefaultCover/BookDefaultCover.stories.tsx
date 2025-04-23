import type { Meta, StoryObj } from '@storybook/react';
import BookDefaultCover from '.';

const meta = {
  title: 'page/edit/BookDefaultCover',
  component: BookDefaultCover,
} satisfies Meta<typeof BookDefaultCover>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
};
