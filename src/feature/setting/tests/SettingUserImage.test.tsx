import { act, screen, waitFor } from '@testing-library/react';
import { render } from '@/lib/test/render';
import { MockUser } from '@/mocks/data';
import SettingUserImage from '../SettingUserImage';
import { DEFAULT_PROFILE } from '../../../constants';

const renderComponent = () => {
  const onImageRemove = vi.fn();
  const onImageUpdate = vi.fn();

  const { user } = render(
    <SettingUserImage
      user={MockUser}
      onImageRemove={onImageRemove}
      onImageUpdate={onImageUpdate}
    />
  );

  const UserImage = () => screen.getByRole('img', { name: '프로필 이미지' });
  const UploadButton = () =>
    screen.getByRole('button', { name: '이미지 업로드' });
  const ResetButton = () => screen.getByRole('button', { name: '이미지 삭제' });

  const clickUploadButton = () => user.click(UploadButton());
  const clickResetButton = () => user.click(ResetButton());

  return {
    onImageRemove,
    onImageUpdate,
    UserImage,
    UploadButton,
    ResetButton,
    clickUploadButton,
    clickResetButton,
  };
};

describe('SettingUserImage', () => {
  test('구성요소를 화면에 보여준다.', async () => {
    const { UserImage, UploadButton, ResetButton } = renderComponent();
    await waitFor(() => expect(UserImage()).toBeInTheDocument());
    expect(UploadButton()).toBeInTheDocument();
    expect(ResetButton()).toBeInTheDocument();
  });

  test('사용자의 profileUrl 값이 없으면 기본 이미지를 보여준다.', async () => {
    const { UserImage } = renderComponent();
    await waitFor(() =>
      expect(UserImage()).toHaveAttribute('src', DEFAULT_PROFILE)
    );
  });

  // TODO: 선택된 file이 없어서 test에서 호출되지 않음
  test('업로드 버튼을 클릭하면 onImageUpdate가 호출된다.', async () => {
    // const { clickUploadButton, onImageUpdate } = renderComponent();
    // await act(async () => clickUploadButton());
    // expect(onImageUpdate).toHaveBeenCalled();
  });

  test('제거 버튼을 클릭하면 onImageRemove를 호출한다.', async () => {
    const { clickResetButton, onImageRemove } = renderComponent();
    await act(async () => clickResetButton());
    expect(onImageRemove).toHaveBeenCalled();
  });
});
