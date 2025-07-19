import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import { expect } from 'storybook/test';
import SortButtons from '.';

const meta = {
  title: 'page/main/SortButtons',
  component: SortButtons,
} satisfies Meta<typeof SortButtons>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: ({ canvas, step }) => {
    step('기본 정렬은 최신순이다.', async () => {
      expect(canvas.getByRole('button', { name: '최신순' })).toHaveAttribute(
        'aria-pressed',
        'true',
      );
    });
  },
};

export const Latest: Story = {
  parameters: {
    nextjs: {
      navigation: {
        router: {
          basePath: '/',
        },
        query: {
          sortBy: 'createdAt',
          sortOrder: '-1',
        },
      },
    },
  },
  play: async ({ canvas, step, userEvent }) => {
    await step(
      'sortBy=createdAt&sortOrder=-1 일 때 "최신순"이 active된다.',
      () => {
        expect(canvas.getByRole('button', { name: '최신순' })).toHaveAttribute(
          'aria-pressed',
          'true',
        );
        expect(
          canvas.getByRole('button', { name: '인기순' }),
        ).not.toHaveAttribute('aria-pressed', 'true');
      },
    );

    await step(
      '"인기순" 버튼을 클릭하면 URL이 /?sortBy=likes&sortOrder=-1 로 변경된다.',
      async () => {
        await userEvent.click(canvas.getByRole('button', { name: '인기순' }));

        expect(getRouter().push).toHaveBeenCalledWith(
          '/?sortBy=likes&sortOrder=-1',
        );
      },
    );
  },
};
export const Likes: Story = {
  parameters: {
    nextjs: {
      navigation: {
        router: {
          basePath: '/',
        },
        query: {
          sortBy: 'likes',
          sortOrder: '-1',
        },
      },
    },
  },
  play: async ({ canvas, step, userEvent }) => {
    await step(
      'sortBy=likes&sortOrder=-1 일 때 "인기순"이 active된다.',
      async () => {
        expect(canvas.getByRole('button', { name: '인기순' })).toHaveAttribute(
          'aria-pressed',
          'true',
        );
        expect(
          canvas.getByRole('button', { name: '최신순' }),
        ).not.toHaveAttribute('aria-pressed', 'true');
      },
    );

    await step(
      '"최신순" 버튼을 클릭하면 URL이 /?sortBy=createdAt&sortOrder=-1 로 변경된다.',
      async () => {
        await userEvent.click(canvas.getByRole('button', { name: '최신순' }));

        expect(getRouter().push).toHaveBeenCalledWith(
          '/?sortBy=createdAt&sortOrder=-1',
        );
      },
    );
  },
};
