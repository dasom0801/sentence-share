import type { Meta, StoryObj } from '@storybook/react';
import SentenceEditPage from '../SentenceEditPage';

const meta = {
  title: 'SentenceEdit/SentenceEditPage',
  component: SentenceEditPage,
  tags: ['autodocs'],
} satisfies Meta<typeof SentenceEditPage>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
};
