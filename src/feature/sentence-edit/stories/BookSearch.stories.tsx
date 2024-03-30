import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BookSearch from '../BookSearch';
import { SentenceEditStep } from '../SentenceEditContainer';

const meta = {
  title: 'sentence/BookSearch',
  component: BookSearch,
} satisfies Meta<typeof BookSearch>;

export default meta;
type Story = StoryObj<typeof BookSearch>;

const BookSearchWithProps = () => {
  const [book, setBook] = useState<Book | undefined>();
  const [, setActive] = useState<SentenceEditStep>(SentenceEditStep.SEARCH);

  return <BookSearch book={book} setBook={setBook} setActive={setActive} />;
};

/**
 * 문장 정보를 작성하기 전에 책을 검색하는 화면입니다.
 */
export const Default: Story = {
  render: () => <BookSearchWithProps />,
  argTypes: {
    book: {
      description: '검색 후 선택한 책입니다.',
      table: {
        type: {
          summary: 'Book',
        },
      },
    },
    setBook: {
      description: '책을 선택하기 위한 set 함수입니다.',
      table: {
        type: {
          summary: 'Dispatch<SetStateAction<Book>>',
        },
      },
    },
    setActive: {
      description:
        '책을 선택한 후 문장 입력 단계로 이동하기 위한 set 함수입니다.',
      table: {
        type: {
          summary: 'Dispatch<SetStateAction<SentenceEditStep>>',
        },
      },
    },
  },
};
