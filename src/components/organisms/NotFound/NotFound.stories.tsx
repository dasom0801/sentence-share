import { Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import { expect } from 'storybook/test';
import NotFound from './';

const meta = {
  title: 'common/organisms/NotFound',
  component: NotFound,
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
  play: async ({ canvas, step, userEvent }) => {
    const defaultTitle = canvas.getByText('페이지를 찾을 수 없습니다.');
    const defaultButton = canvas.getByRole('button', { name: '뒤로 가기' });

    await step('기본 타이틀과 버튼이 표시되어야 한다.', () => {
      expect(defaultTitle).toBeInTheDocument();
      expect(defaultButton).toBeInTheDocument();
    });

    await step('버튼을 클릭하면 뒤로가기 함수가 호출되어야 한다.', async () => {
      await userEvent.click(defaultButton);
      expect(getRouter().back).toHaveBeenCalled();
    });
  },
};

export const Title: Story = {
  args: {
    title: '잘못된 경로입니다.',
  },
  play: async ({ canvas, step, args }) => {
    await step('전달 받은 title이 표시되어야 한다.', () => {
      if (args.title) {
        expect(args.title).toBeDefined();
        expect(canvas.getByText(args.title)).toBeInTheDocument();
        expect(
          canvas.queryByText('페이지를 찾을 수 없습니다.'),
        ).not.toBeInTheDocument();
      }
    });
  },
};

export const Children: Story = {
  args: {
    children: (
      <Button variant="contained" color="secondary">
        목록으로
      </Button>
    ),
  },
  play: async ({ canvas, step, args }) => {
    await step('children이 표시되어야 한다.', () => {
      if (args.children) {
        expect(args.children).toBeDefined();
        expect(canvas.getByRole('button').textContent).not.toEqual('뒤로 가기');
        expect(canvas.getByRole('button').textContent).toEqual('목록으로');
      }
    });
  },
};
