import { LikeButton } from '@/components/molecules';
import { MockSentence } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import userEvent from '@testing-library/user-event';
import { expect } from 'storybook/test';
import SentenceCard from '.';

const meta = {
  title: 'common/organisms/SentenceCard',
  component: SentenceCard,
  args: {
    sentence: {
      ...MockSentence,
    },
  },
  decorators: (Story) => {
    return (
      <div style={{ width: '50%', listStyle: 'none' }}>
        <Story />
      </div>
    );
  },
} satisfies Meta<typeof SentenceCard>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvas, step }) => {
    const links = canvas.getAllByRole('link');
    await step('문장 정보가 화면에 렌더링된다.', () => {
      // 사용자 정보
      expect(canvas.getByText(MockSentence.author.name)).toBeInTheDocument();
      expect(
        canvas.getByRole('img', { name: MockSentence.author.name }),
      ).toHaveAttribute(
        'src',
        expect.stringContaining(MockSentence.author.profileUrl),
      );

      // 작성일
      expect(
        canvas.getByText(MockSentence.createdAt.split('T')[0]),
      ).toBeInTheDocument();

      // 문장
      expect(canvas.getByText(MockSentence.content)).toBeInTheDocument();

      // 책 정보
      expect(canvas.getByText(MockSentence.book.title)).toBeInTheDocument();
      expect(
        canvas.getByText(MockSentence.book.author.join(',')),
      ).toBeInTheDocument();
      expect(
        canvas.getByRole('img', { name: MockSentence.book.title }),
      ).toHaveAttribute('src', MockSentence.book.coverUrl);
    });
    await step('문장을 클릭하면 문장 상세 페이지로 이동한다', async () => {
      const sentenceDetailUrl = `/sentence/${MockSentence._id}`;
      const targetLink = links.find(
        (link) => link.getAttribute('href') === sentenceDetailUrl,
      );

      expect(targetLink).toBeInTheDocument();
      if (targetLink) {
        await userEvent.click(targetLink);
        expect(getRouter().push).toHaveBeenCalledWith(sentenceDetailUrl, {
          scroll: true,
        });
      }
    });

    await step('책 정보를 클릭하면 책 상세 페이지로 이동한다.', async () => {
      const bookDetailUrl = `/book/${MockSentence.book._id}`;
      const targetLink = links.find(
        (link) => link.getAttribute('href') === bookDetailUrl,
      );

      expect(targetLink).toBeInTheDocument();
      if (targetLink) {
        await userEvent.click(targetLink);
        expect(getRouter().push).toHaveBeenCalledWith(bookDetailUrl, {
          scroll: true,
        });
      }
    });
  },
};

export const HideBook: Story = {
  args: {
    ...Default.args,
    showBook: false,
  },
  play: ({ canvas, step }) => {
    step('책 정보가 숨김 처리되면 화면에 표시되지 않는다', () => {
      expect(
        canvas.queryByText(MockSentence.book.title),
      ).not.toBeInTheDocument();
    });
  },
};

export const WithChildren: Story = {
  render: (args) => {
    return (
      <SentenceCard {...args}>
        <LikeButton isLiked={false} id={MockSentence._id} />
      </SentenceCard>
    );
  },
  play: ({ canvas, step }) => {
    step('Children이 있으면 화면에 렌더링된다.', () => {
      expect(
        canvas.getByRole('button', { name: '좋아요' }),
      ).toBeInTheDocument();
    });
  },
};
