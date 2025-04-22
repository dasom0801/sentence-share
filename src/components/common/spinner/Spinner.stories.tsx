import type { Meta, StoryObj } from '@storybook/react';
import Spinner from '.';
const meta = {
  title: 'common/Spinner',
  component: Spinner,
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
