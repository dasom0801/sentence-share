import { Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect, fn, screen } from 'storybook/test';
import AlertDialog from '.';

const meta = {
  title: 'common/molecules/AlertDialog',
  component: AlertDialog,
  args: {
    open: false,
    title: 'Alert Dialog Title',
    content: 'Alert Dialog Content',
    handleClose: fn(),
    handleConfirm: fn(),
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToggleAlertDialog: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Show Alert
        </Button>
        <AlertDialog {...args} open={open} />
      </>
    );
  },
  play: async ({ canvas, userEvent, step, args }) => {
    const button = canvas.getByRole('button', { name: 'Show Alert' });
    await step(
      'open값이 true로 설정되면 컴포넌트가 화면에 표시된다.',
      async () => {
        await userEvent.click(button);
        expect(screen.queryByRole('dialog')).toBeInTheDocument();
        if (args.title) {
          expect(screen.getByText(args.title)).toBeInTheDocument();
        }
        expect(screen.getByText(args.content)).toBeInTheDocument();
        expect(
          screen.getByRole('button', { name: '취소' }),
        ).toBeInTheDocument();
        expect(
          screen.getByRole('button', { name: '확인' }),
        ).toBeInTheDocument();
      },
    );

    await step(
      '취소 버튼을 클릭하면 handleClose 함수가 호출된다.',
      async () => {
        const button = screen.getByRole('button', { name: '취소' });
        await userEvent.click(button);
        expect(args.handleClose).toHaveBeenCalledOnce();
      },
    );

    await step(
      '확인 버튼을 클릭하면 handleConfirm 함수가 호출된다.',
      async () => {
        const button = screen.getByRole('button', { name: '확인' });
        await userEvent.click(button);
        expect(args.handleConfirm).toHaveBeenCalledOnce();
      },
    );
  },
};
