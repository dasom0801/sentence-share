import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import type { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';
import Pagination from './';

const meta = {
  title: 'common/molecules/Pagination',
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvas, step }) => {
    const allButtons = canvas.getAllByRole('button');
    await step('count를 입력하지 않으면 1 페이지만 표시된다.', () => {
      expect(
        allButtons.filter((button) => !button.querySelector('svg')).length,
      ).toBe(1);

      const pageButton = canvas.getByRole('button', { name: 'page 1' });
      expect(pageButton).toBeInTheDocument();
      expect(pageButton).toHaveAttribute('aria-current', 'true');
    });
    await step('이전 페이지와 다음페이지는 disabled 상태이다', () => {
      const prevButton = allButtons[0];
      const nextButton = allButtons[allButtons.length - 1];
      expect(prevButton.hasAttribute('disabled')).toBe(true);
      expect(nextButton.hasAttribute('disabled')).toBe(true);
    });
  },
};

export const PagesCount7: Story = {
  args: {
    count: 7,
  },
  play: async ({ canvas, step, userEvent }) => {
    const allButtons = canvas.getAllByRole('button');
    const pageButtons = allButtons.filter(
      (button) => !button.querySelector('svg'),
    );
    await step('일곱개의 페이지 버튼이 표시된다.', () => {
      expect(pageButtons.length).toBe(7);
    });

    await step('첫번째 페이지 버튼이 선택된 상태이다.', () => {
      expect(pageButtons[0]).toHaveAttribute('aria-current', 'true');
      pageButtons
        .slice(1)
        .forEach((button) =>
          expect(button).not.toHaveAttribute('aria-current', 'true'),
        );
    });

    await step(
      '두번째 페이지 버튼을 클릭하면 URL이 /?page=2 로 변경된다.',
      async () => {
        const pageButton = canvas.getByRole('button', {
          name: /go to page 2/i,
        });
        await userEvent.click(pageButton);
        expect(getRouter().push).toHaveBeenCalledWith('/?page=2');
      },
    );

    await step(
      '다음 페이지 버튼을 클릭하면 URL이 /?page=2로 변경된다.',
      async () => {
        const nextButton = canvas.getByRole('button', {
          name: 'Go to next page',
        });
        await userEvent.click(nextButton);
        expect(getRouter().push).toHaveBeenCalledWith('/?page=2');
      },
    );

    await step('이전 페이지 버튼은 disabled 상태이다.', () => {
      const prevButton = canvas.getByRole('button', {
        name: 'Go to previous page',
      });

      expect(prevButton.hasAttribute('disabled')).toBe(true);
    });
  },
};

export const PagesCount8: Story = {
  args: {
    count: 8,
  },
  play: async ({ canvas, userEvent, step }) => {
    const allButtons = canvas.getAllByRole('button');
    const pageButtons = allButtons.filter(
      (button) => !button.querySelector('svg'),
    );

    await step('페이지 버튼은 6개만 표시된다', () => {
      expect(pageButtons.length).toBe(6);
    });

    await step('페이지네이션 중간에 "…"이 표시된다', () => {
      expect(canvas.getByText('…')).toBeInTheDocument();
    });
  },
};

export const PagesCount10Active6: Story = {
  args: {
    count: 10,
  },
  parameters: {
    nextjs: {
      navigation: {
        query: {
          page: '6',
        },
      },
    },
  },
  play: async ({ canvas, userEvent, step }) => {
    await step(
      'URL에 페이지가 설정된 상태로 접속하면 해당 페이지가 선택된다.',
      () => {
        const page6 = canvas.getByRole('button', { name: 'page 6' });
        expect(page6).toHaveAttribute('aria-current', 'true');
      },
    );
    await step(
      '현재 페이지가 6일 때, 다음 페이지 버튼을 클릭하면 URL이 /?page=7로 변경된다.',
      async () => {
        const nextButton = canvas.getByRole('button', {
          name: 'Go to next page',
        });
        await userEvent.click(nextButton);
        expect(getRouter().push).toHaveBeenCalledWith('/?page=7');
      },
    );
    await step(
      '현재 페이지가 6일 때, 이전 페이지 버튼을 클릭하면 URL이 /?page=5로 변경된다.',
      async () => {
        const prevButton = canvas.getByRole('button', {
          name: 'Go to previous page',
        });
        await userEvent.click(prevButton);
        expect(getRouter().push).toHaveBeenCalledWith('/?page=5');
      },
    );
  },
};
