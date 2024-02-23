import type { Meta, StoryObj } from '@storybook/react';
import Profile from '.';
import { BrowserRouter } from 'react-router-dom';
const meta = {
  title: 'Profile/page/Profile',
  component: Profile,
  tags: ['autodocs'],
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  decorators: (Story) => {
    return (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    );
  },
};
