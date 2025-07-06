import { Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import NoResult from '.';

const meta = {
  title: 'common/molecules/NoResult',
  component: NoResult,
} satisfies Meta<typeof NoResult>;

export default meta;
type Story = StoryObj<typeof meta>;

const args = {
  title: '결과 없음',
  description: '"검색어"에 대한 결과가 없습니다. 다시 검색해보세요.',
};

export const TitleAndDescription: Story = {
  args,
  play: ({ canvas }) => {
    expect(canvas.getByText(args.title)).toBeInTheDocument();
    expect(canvas.getByText(args.description)).toBeInTheDocument();
  },
};

export const Title: Story = {
  args: {
    title: args.title,
  },
  play: ({ canvas }) => {
    expect(canvas.getByText(args.title)).toBeInTheDocument();
    const description = canvas.queryByText(args.description);
    expect(description).not.toBeInTheDocument();
  },
};

export const DescriptionOnly: Story = {
  args: {
    description: args.description,
  },
  play: ({ canvas }) => {
    expect(canvas.queryByText(args.title)).not.toBeInTheDocument();
    expect(canvas.getByText(args.description)).toBeInTheDocument();
  },
};

export const WithChildren: Story = {
  args,
  render: (args) => {
    return (
      <NoResult {...args}>
        <Button>재시도</Button>
      </NoResult>
    );
  },
  play: ({ canvas }) => {
    expect(canvas.getByText(args.title)).toBeInTheDocument();
    expect(canvas.getByText(args.description)).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: '재시도' })).toBeInTheDocument();
  },
};
