import { handleGetSentence } from '@/mocks/handlers';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Page from './page';

const meta = {
  title: 'page/edit/sentence/[id]',
  component: Page,
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    params: { id: 'test-id' },
  },
  parameters: {
    msw: [handleGetSentence()],
  },
};
