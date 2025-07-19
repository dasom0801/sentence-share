import { handleSearchBookWithKakaoAPI } from '@/mocks/handlers';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SentenceEditProvider } from '../../contexts';
import SentenceEditContent from './';

const meta = {
  title: 'page/edit/sentence/SentenceEditContent',
  component: SentenceEditContent,
  decorators: [
    (Story) => (
      <SentenceEditProvider>
        <Story />
      </SentenceEditProvider>
    ),
  ],
  parameters: {
    msw: {
      handlers: [handleSearchBookWithKakaoAPI()],
    },
  },
} satisfies Meta<typeof SentenceEditContent>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {},
};
