import type { Meta, StoryObj } from '@storybook/react';
import NotFound from '../NotFound';

const meta = {
  title: 'common/NotFound',
  component: NotFound,
  tags: ['autodocs'],
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
