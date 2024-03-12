import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import Button from '../Button';
const meta = {
  title: 'common/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryFn<typeof meta>;

export const Default: Story = () => {
  return <Button variant='contained'>버튼</Button>;
};
