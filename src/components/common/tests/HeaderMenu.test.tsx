import HeaderMenu from '../HeaderMenu';
import { screen, waitFor } from '@testing-library/react';
import { MockUser } from '@/mocks/data';
import { render } from '@/lib/test/render';

const renderComponent = () => {
  const { user } = render(<HeaderMenu user={MockUser} />);

  const ProfileButton = () => screen.getByRole('button');
  const Menu = () => screen.queryByRole('menu');

  const clickUserProfile = async () => await user.click(ProfileButton());

  return { clickUserProfile, Menu };
};

describe('HeaderMenu Component', () => {
  test('프로필 이미지를 클릭하면 드롭다운 메뉴가 토글된다.', async () => {
    const { Menu, clickUserProfile } = renderComponent();
    clickUserProfile();
    await waitFor(() => expect(Menu()).toBeInTheDocument());
  });
});
