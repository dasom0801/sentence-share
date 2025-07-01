import { MockUser } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HeaderMenu from '.';

const meta = {
  title: 'layout/HeaderMenu',
  component: HeaderMenu,
} satisfies Meta<typeof HeaderMenu>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    user: MockUser,
  },
};
