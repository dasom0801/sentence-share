import type { Meta, StoryObj } from '@storybook/react';
import ProfileSetting from '.';
import { BrowserRouter } from 'react-router-dom';
const meta = {
  title: 'Profile/page/Setting',
  component: ProfileSetting,
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileSetting>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  decorators: (Story) => (
    <BrowserRouter>
      <Story />
    </BrowserRouter>
  ),
};
