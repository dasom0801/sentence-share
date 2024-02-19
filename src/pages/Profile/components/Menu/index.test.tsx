import { render, screen } from '@testing-library/react';
import Menu from '.';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

describe('Profile | Menu Component', () => {
  test('메뉴를 클릭하면 path의 주소로 이동한다.', () => {
    const user = userEvent.setup();
    const menus = [
      { label: 'Menu1', path: '/profile/menu1' },
      { label: 'Menu2', path: '/profile/menu2' },
    ];

    render(
      <MemoryRouter initialEntries={['/profile/menu1']}>
        <Menu menus={menus} />
      </MemoryRouter>
    );

    menus.forEach(async ({ label, path }) => {
      const tab = screen.getByRole('tab', { name: label });
      await user.click(tab);
      expect(window.location.pathname).toBe(path);
    });
  });
});
