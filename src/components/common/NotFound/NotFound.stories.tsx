import type { Meta, StoryObj } from '@storybook/react';
import NotFound from '../../../app/not-found';

const meta = {
  title: 'common/NotFound',
  component: NotFound,
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
