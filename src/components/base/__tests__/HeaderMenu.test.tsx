import userEvent from '@testing-library/user-event';
import HeaderMenu from '../HeaderMenu';
import { render, screen, waitFor } from '@testing-library/react';
import { MockUser } from '../../../test-utils/index.mock';
import { BrowserRouter } from 'react-router-dom';

const renderComponent = () => {
  const user = userEvent.setup();
  render(<HeaderMenu user={MockUser} />, { wrapper: BrowserRouter });

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
