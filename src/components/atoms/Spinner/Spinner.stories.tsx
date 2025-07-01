import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Spinner from '.';
const meta = {
  title: 'common/atoms/Spinner',
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
