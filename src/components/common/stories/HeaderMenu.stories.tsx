import type { Meta, StoryObj } from '@storybook/react';
import { MockUser } from '@/mocks/data';
import HeaderMenu from '../HeaderMenu';

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
