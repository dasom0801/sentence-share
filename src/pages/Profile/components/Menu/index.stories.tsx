import type { Meta, StoryObj } from '@storybook/react';
import Menu from './';
import { BrowserRouter } from 'react-router-dom';
const meta = {
  title: 'Profile/Menu',
  component: Menu,
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

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
