import type { Meta, StoryObj } from '@storybook/nextjs';
import AlertDialog from '.';

const meta = {
  title: 'common/molecules/AlertDialog',
  component: AlertDialog,
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
