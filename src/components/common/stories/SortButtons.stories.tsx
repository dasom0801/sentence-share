import type { Meta, StoryObj } from '@storybook/react';
import SortButtons from '../SortButtons';
import { BrowserRouter } from 'react-router-dom';

const meta = {
  title: 'common/SortButtons',
  component: SortButtons,
  tags: ['autodocs'],
} satisfies Meta<typeof SortButtons>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};
