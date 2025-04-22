import type { Meta, StoryObj } from '@storybook/react';
import SortButtons from '.';

const meta = {
  title: 'common/SortButtons',
  component: SortButtons,
} satisfies Meta<typeof SortButtons>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
