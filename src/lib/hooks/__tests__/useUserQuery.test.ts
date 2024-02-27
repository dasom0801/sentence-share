import { renderHook, waitFor } from '@testing-library/react';
import useUserQuery from '../useUserQuery';
import { act } from 'react-dom/test-utils';
import { server } from '../../../test-utils/mocks/server';
import { rest } from 'msw';
import { wrapper } from '../../../test-utils/testRender';

it('token이 있을 때 user data를 가져온다.', async () => {
  const { result } = renderHook(() => useUserQuery(), { wrapper: wrapper() });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(result.current.data?.name).toBe('user name');
});

it('token이 없을 때는 user data가 없다.', async () => {
  const { result } = renderHook(() => useUserQuery(), { wrapper: wrapper() });

  act(() => {
    // 토큰이 없는 경우를 가정함
    server.use(
      rest.get('/api/user/me', (req, res, ctx) => {
        return res(ctx.status(401));
      })
    );
  });

  await waitFor(() => expect(result.current.data).toBeUndefined());
});
