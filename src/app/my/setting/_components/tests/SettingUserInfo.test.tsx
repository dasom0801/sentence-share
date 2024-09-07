import { screen, waitFor } from '@testing-library/react';
import { MockUser } from '@/mocks/data';
import { render } from '@/lib/test/render';
import SettingUserInfo from '../setting-user-info';

const renderComponent = () => {
  const onSubmit = vi.fn();
  const { user } = render(<SettingUserInfo user={MockUser} />);

  const UserNameInput = () =>
    screen.getByRole('textbox', { name: '이름' }) as HTMLInputElement;
  const SubmitButton = () => screen.getByRole('button', { name: '저장' });
  const clearUserName = async () => await user.clear(UserNameInput());

  const changeUserName = async (name: string) =>
    await user.type(UserNameInput(), name);

  const clickSubmitButton = async () => await user.click(SubmitButton());

  return {
    onSubmit,
    UserNameInput,
    SubmitButton,
    clearUserName,
    changeUserName,
    clickSubmitButton,
  };
};

describe('SettingUserInfo', () => {
  test('기본 구성요소를 렌더링한다.', async () => {
    const { UserNameInput, SubmitButton } = renderComponent();
    await waitFor(() => expect(UserNameInput()).toBeInTheDocument());
    expect(SubmitButton()).toBeInTheDocument();
  });

  test('인풋에 사용자 기본 정보를 보여준다.', async () => {
    const { UserNameInput } = renderComponent();
    await waitFor(() => expect(UserNameInput()).toHaveValue(MockUser.name));
  });

  test('SubmitButton을 클릭하면 인풋에 입력된 값으로 onSubmit을 호출해야 한다.', async () => {
    const { clearUserName, changeUserName, onSubmit, clickSubmitButton } =
      renderComponent();
    await clearUserName();
    await changeUserName('Changed Name');
    await clickSubmitButton();
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Changed Name',
    });
  });

  test('필수값이 입력되지 않았다면 onSubmit은 호출되지 않는다.', async () => {
    const { clearUserName, onSubmit, clickSubmitButton } = renderComponent();
    await clearUserName();
    await clickSubmitButton();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
