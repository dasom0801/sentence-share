import type { Meta, StoryObj } from '@storybook/react';
import ErrorResult from '../ErrorResult';

const meta = {
  title: 'common/ErrorResult',
  component: ErrorResult,
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorResult>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
};
