import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MockBook } from '@/mocks/data';
import SentenceInput from '../SentenceInput';
import { SentenceEditStep } from '../SentenceEditContainer';

const meta = {
  title: 'sentence/SentenceInput',
  component: SentenceInput,
} satisfies Meta<typeof SentenceInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const SentenceInputWithProps = () => {
  const [content, setContent] = useState<string | undefined>('');
  const [, setActive] = useState<SentenceEditStep>(SentenceEditStep.INPUT);

  return (
    <SentenceInput
      sentenceId={undefined}
      book={MockBook}
      content={content}
      setContent={setContent}
      setActive={setActive}
    />
  );
};

/**
 *  문장 내용을 작성하고 수정하는 화면입니다.
 *
 */
export const Default = {
  render: () => <SentenceInputWithProps />,
  argTypes: {
    sentenceId: {
      description:
        '수정하는 문장의 Id입니다. 새로 작성하는 경우는 값이 없습니다.',
      table: {
        type: {
          summary: 'string | undefined',
        },
      },
    },
    book: {
      description: '검색 후 선택한 책입니다.',
      table: {
        type: {
          summary: 'Book',
        },
      },
    },
    content: {
      description: '입력한 내용입니다.',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    setContent: {
      description: '텍스트 박스를 컨트롤하기 위한 set 함수입니다. ',
      table: {
        type: {
          summary: 'Dispatch<SetStateAction<string>>',
        },
      },
    },
    setActive: {
      description: '책 선택 단계로 이동하기 위한 set 함수입니다.',
      table: {
        type: {
          summary: 'Dispatch<SetStateAction<SentenceEditStep>>',
        },
      },
    },
  },
};
