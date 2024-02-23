import { act, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileImageEdit from '.';
import { MockUser } from '../../../../test-utils/index.mock';
import { DEFAULT_PROFILE } from '../../../../constants';
import { render, wrapper } from '../../../../test-utils/testRender';
import { useUserQuery } from '../../../../hooks';

jest.mock('../../../../hooks', () => ({
  useUserQuery: jest.fn(),
}));

const mockUseCurrentUser = (data: User | undefined) => {
  (useUserQuery as jest.Mock).mockImplementation(() => ({ data }));
};

const renderComponent = (mock: User = MockUser) => {
  mockUseCurrentUser(mock);
  const user = userEvent.setup();
  render(<ProfileImageEdit />);

  const UserImage = () => screen.getByRole('img', { name: '프로필 이미지' });
  const UploadButton = () =>
    screen.getByRole('button', { name: '이미지 업로드' });
  const ResetButton = () => screen.getByRole('button', { name: '이미지 삭제' });

  const clickUploadButton = () => user.click(UploadButton());
  const clickResetButton = () => user.click(ResetButton());

  return {
    UserImage,
    UploadButton,
    ResetButton,
    clickUploadButton,
    clickResetButton,
  };
};

describe('Profile > Components > ProfileImageEdit', () => {
  test('구성요소를 화면에 보여준다.', async () => {
    const { UserImage, UploadButton, ResetButton } = renderComponent();
    await waitFor(() => expect(UserImage()).toBeInTheDocument());
    expect(UploadButton()).toBeInTheDocument();
    expect(ResetButton()).toBeInTheDocument();
  });

  test('사용자의 profileUrl 값이 없으면 기본 이미지를 보여준다.', async () => {
    mockUseCurrentUser({ ...MockUser, profileUrl: '' });
    const { UserImage } = renderComponent();
    await waitFor(() =>
      expect(UserImage()).toHaveAttribute('src', DEFAULT_PROFILE)
    );
  });

  test('업로드 버튼을 클릭하면 이미지 주소가 달라진다.', async () => {
    const { clickUploadButton, UserImage } = renderComponent();
    await act(async () => clickUploadButton());

    // TODO: test
    // await waitFor(() =>
    //   expect(UserImage()).not.toHaveAttribute('src', MockUser.profileUrl)
    // );
  });

  test('제거 버튼을 클릭하면 기본 이미지를 보여준다.', async () => {
    const { clickResetButton, UserImage } = renderComponent({
      ...MockUser,
      profileUrl: 'profile Url',
    });

    await act(async () => clickResetButton());
    // TODO: test
    // await waitFor(() =>
    //   expect(UserImage()).toHaveAttribute('src', DEFAULT_PROFILE)
    // );
  });
});
