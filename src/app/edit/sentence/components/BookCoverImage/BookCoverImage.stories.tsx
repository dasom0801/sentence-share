import type { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, waitFor } from 'storybook/test';
import BooKCoverImage from './';

const meta = {
  title: 'page/edit/sentence/BooKCoverImage',
  component: BooKCoverImage,
} satisfies Meta<typeof BooKCoverImage>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  coverUrl:
    'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1652076%3Ftimestamp%3D20190131131541',
  alt: 'Book Cover',
};

export const BookCover: Story = {
  args: {
    ...defaultArgs,
  },
  play: async ({ canvas }) => {
    const image = canvas.getByRole('img', { name: defaultArgs.alt });
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toContain(defaultArgs.coverUrl);
  },
};

export const BookCoverError: Story = {
  args: {
    ...defaultArgs,
    coverUrl: 'https://invalid-url.com/cover.jpg',
  },
  play: async ({ canvas }) => {
    // 처음에는 책 이미지 렌더링
    const image = canvas.getByRole('img', { name: defaultArgs.alt });
    expect(image).toBeInTheDocument();

    // 에러 발생
    fireEvent.error(image);

    // Default Cover 이미지 렌더링
    const defaultCover = await canvas.findByTestId('book-default-cover');
    expect(defaultCover).toBeInTheDocument();

    await waitFor(() => {
      const bookCover = canvas.queryByRole('img', { name: defaultArgs.alt });
      expect(bookCover).not.toBeInTheDocument();
    });
  },
};
