import type { Meta, StoryObj } from '@storybook/react';

import Setting from '../SettingPage';

const meta = {
  title: 'Setting/Setting',
  component: Setting,
  tags: ['autodocs'],
} satisfies Meta<typeof Setting>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
