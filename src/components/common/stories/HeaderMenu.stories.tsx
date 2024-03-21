import type { Meta, StoryObj } from '@storybook/react';
import HeaderMenu from '../HeaderMenu';
import { MockUser } from '@/mocks/data';
import { BrowserRouter } from 'react-router-dom';
const meta = {
  title: 'common/HeaderMenu',
  component: HeaderMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof HeaderMenu>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    user: MockUser,
  },
  decorators: (Story) => {
    return (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    );
  },
};