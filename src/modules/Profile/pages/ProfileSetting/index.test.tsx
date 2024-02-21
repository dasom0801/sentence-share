import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileSetting from '.';
import { BrowserRouter } from 'react-router-dom';

describe('Pages > Profile > Pages > ProfileSetting', () => {
  test('로그아웃 버튼을 클릭하면 메인으로 이동한다.', async () => {
    const user = userEvent.setup();
    render(<ProfileSetting />, { wrapper: BrowserRouter });
    const logoutButton = screen.getByRole('button', { name: '로그아웃' });
    await user.click(logoutButton);

    expect(window.location.pathname).toBe('/');
  });
});
