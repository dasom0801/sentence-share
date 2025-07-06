import { MockUser } from '@/mocks/data';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import UserInfo from '.';

const meta = {
  title: 'common/molecules/UserInfo',
  component: UserInfo,
  args: {
    user: MockUser,
  },
} satisfies Meta<typeof UserInfo>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: ({ canvas }) => {
    const image = canvas.getByRole('img', { name: MockUser.name });
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toContain(MockUser.profileUrl);
    expect(canvas.getByText(MockUser.name)).toBeInTheDocument();
  },
};
