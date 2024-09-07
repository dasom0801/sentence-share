import type { Meta, StoryObj } from '@storybook/react';
import NoResult from '../no-result';

const meta = {
  title: 'common/NoResult',
  component: NoResult,
} satisfies Meta<typeof NoResult>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
};

export const Description: Story = {
  args: {
    description: '"검색어"에 대한 결과가 없습니다. 다시 검색해보세요.',
  },
};
