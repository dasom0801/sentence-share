import { MockUser } from '@/mocks/data';
import { useUserStore } from '@/store/user';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, waitFor } from 'storybook/test';
import SettingUserInfo from '.';

const meta = {
  title: 'page/my/setting/SettingUserInfo',
  component: SettingUserInfo,
  beforeEach: () => {
    useUserStore.setState({ user: MockUser });
  },
} satisfies Meta<typeof SettingUserInfo>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvas, step }) => {
    await step('인풋에 사용자 이름이 입력되어 있다.', () => {
      const input = canvas.getByRole('textbox');
      const state = useUserStore.getState();
      expect(input).toHaveValue(state.user?.name);
    });
  },
};

export const ValidateRequired: Story = {
  play: async ({ canvas, step, userEvent }) => {
    await step(
      '인풋이 입력되지 않으면 에러 텍스트가 표시되어야 한다.',
      async () => {
        const input = canvas.getByRole('textbox');
        await userEvent.clear(input);
        input.blur();
        await waitFor(() => {
          expect(canvas.getByText('이름을 입력해주세요.')).toBeInTheDocument();
        });
      },
    );
  },
};

export const ValidateMin: Story = {
  play: async ({ canvas, step, userEvent }) => {
    const input = canvas.getByRole('textbox');
    await step(
      '인풋에 한글자만 입력되면 에러 텍스트가 표시되어야 한다.',
      async () => {
        await userEvent.clear(input);
        await userEvent.type(input, '_');
        input.blur();
        await waitFor(() => {
          expect(
            canvas.getByText('이름은 최소 2자 이상이어야 합니다.'),
          ).toBeInTheDocument();
        });
      },
    );
    await step(
      '인풋에 두글자 이상 입력하면 에러 텍스트가 사라져야 한다.',
      async () => {
        await userEvent.clear(input);
        await userEvent.type(input, '__');
        input.blur();
        await waitFor(() => {
          expect(
            canvas.queryByText('이름은 최소 2자 이상이어야 합니다.'),
          ).not.toBeInTheDocument();
        });
      },
    );
  },
};

export const ValidateMax: Story = {
  play: async ({ canvas, step, userEvent }) => {
    const input = canvas.getByRole('textbox');
    await step(
      '인풋에 10자 이상 입력되면 에러 텍스트가 표시되어야 한다.',
      async () => {
        await userEvent.clear(input);
        await userEvent.type(input, '12345678910');
        input.blur();
        await waitFor(() => {
          expect(
            canvas.getByText('이름은 최대 10자까지 입력 가능합니다.'),
          ).toBeInTheDocument();
        });
      },
    );
    await step(
      '인풋에 10자만 입력되면 에러 텍스트가 사라져야 한다.',
      async () => {
        await userEvent.clear(input);
        await userEvent.type(input, '0123456789');
        input.blur();
        await waitFor(() => {
          expect(
            canvas.queryByText('이름은 최대 10자까지 입력 가능합니다.'),
          ).not.toBeInTheDocument();
        });
      },
    );
  },
};

export const ValidateRegex: Story = {
  play: async ({ canvas, step, userEvent }) => {
    const input = canvas.getByRole('textbox');
    await step(
      '인풋에 특수문자가 입력되면 에러 텍스트가 표시되어야 한다.',
      async () => {
        await userEvent.clear(input);
        await userEvent.type(input, 'test123***');
        input.blur();
        await waitFor(() => {
          expect(
            canvas.getByText(
              '이름에는 문자, 숫자, 언더바(_)만 사용할 수 있습니다.',
            ),
          ).toBeInTheDocument();
        });
      },
    );
  },
};
