import { handleSearchBookWithKakaoAPI } from '@/mocks/handlers';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor } from 'storybook/test';
import { SentenceEditProvider } from '../../contexts';
import BookSearch from './';

const meta = {
  title: 'page/edit/sentence/BookSearch',
  component: BookSearch,
  parameters: {
    msw: {
      handlers: [handleSearchBookWithKakaoAPI()],
    },
  },
  decorators: [
    (Story) => (
      <SentenceEditProvider>
        <Story />
      </SentenceEditProvider>
    ),
  ],
} satisfies Meta<typeof BookSearch>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};

export const Pending: Story = {
  parameters: {
    msw: {
      handlers: [handleSearchBookWithKakaoAPI('pending')],
    },
  },
  play: async ({ canvas, step, userEvent }) => {
    await step('로딩중에는 스켈레톤이 표시된다.', async () => {
      const searchInput = canvas.getByPlaceholderText('책 이름을 입력해주세요');
      searchInput.focus();
      await userEvent.type(searchInput, '긴긴밤');
      await waitFor(async () => {
        await expect(canvas.getAllByRole('listitem').length).toBe(5);
        await expect(canvas.queryByText('긴긴밤')).not.toBeInTheDocument();
      });
    });
  },
};

export const SearchBook: Story = {
  play: async ({ canvas, step, userEvent, args }) => {
    await step('검색한 책이 목록에 표시된다', async () => {
      const searchInput = canvas.getByPlaceholderText('책 이름을 입력해주세요');
      searchInput.focus();
      await userEvent.type(searchInput, '긴긴밤');
      await waitFor(async () => {
        await expect(canvas.getByText('긴긴밤')).toBeInTheDocument();
      });
    });
  },
};

export const ClickOutside: Story = {
  play: async ({ canvas, step, userEvent }) => {
    await step('바깥 영역을 클릭하면 목록이 닫힌다.', async () => {
      const searchInput = canvas.getByPlaceholderText('책 이름을 입력해주세요');
      searchInput.focus();
      await userEvent.type(searchInput, '긴긴밤');
      await waitFor(async () => {
        await expect(canvas.getByText('긴긴밤')).toBeInTheDocument();
      });
      await userEvent.click(document.body);
      await waitFor(async () => {
        await expect(canvas.queryByText('긴긴밤')).not.toBeInTheDocument();
      });
    });
  },
};
