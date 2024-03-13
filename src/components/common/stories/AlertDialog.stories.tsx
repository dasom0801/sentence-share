import type { Meta, StoryObj } from '@storybook/react';
import AlertDialog from '../AlertDialog';

const meta = {
  title: 'common/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    open: true,
    title: 'Alert Dialog Title',
    content: 'Alert Dialog Content',
    handleClose: () => console.log('close'),
    handleConfirm: () => console.log('confirm'),
  },
};
