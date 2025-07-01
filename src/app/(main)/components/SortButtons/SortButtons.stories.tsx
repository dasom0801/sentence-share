import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SortButtons from '.';

const meta = {
  title: 'page/main/SortButtons',
  component: SortButtons,
} satisfies Meta<typeof SortButtons>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
