import { handleSearchBookWithKakaoAPI } from '@/mocks/handlers';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Page from './page';

const meta = {
  title: 'page/edit/sentence',
  component: Page,
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  parameters: {
    msw: {
      handlers: [handleSearchBookWithKakaoAPI()],
    },
  },
};
