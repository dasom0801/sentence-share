import type { Meta, StoryObj } from '@storybook/react';
import ProfileMenu from '.';
import { BrowserRouter } from 'react-router-dom';
const meta = {
  title: 'Profile/components/ProfileMenu',
  component: ProfileMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  decorators: [
    (Story) => {
      return (
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      );
    },
  ],
  args: {
    menus: [
      { label: 'Menu1', path: '/profile/menu1' },
      { label: 'Menu2', path: '/profile/menu2' },
    ],
  },
};
