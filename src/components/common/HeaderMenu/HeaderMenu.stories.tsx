import { MockUser } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/react';
import HeaderMenu from '.';

const meta = {
  title: 'common/HeaderMenu',
  component: HeaderMenu,
} satisfies Meta<typeof HeaderMenu>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    user: MockUser,
  },
};
