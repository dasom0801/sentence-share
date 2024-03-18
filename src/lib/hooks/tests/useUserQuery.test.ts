import { renderHook, waitFor } from '@testing-library/react';
import useUserQuery from '../useUserQuery';
import { HttpResponse, http } from 'msw';
import { server } from '@/setupTests';
import { wrapperWithReactQuery } from '@/lib/test/render';

it('token이 있을 때 user data를 가져온다.', async () => {
  const { result } = renderHook(() => useUserQuery(), {
    wrapper: wrapperWithReactQuery(),
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(result.current.data?.name).toBe('user name');
});

it('token이 없을 때는 user data가 없다.', async () => {
  const { result } = renderHook(() => useUserQuery(), {
    wrapper: wrapperWithReactQuery(),
  });

  // 토큰이 없는 경우를 가정함
  server.use(
    http.get('/api/user/me', () => {
      return HttpResponse.json(null, { status: 401 });
    })
  );

  await waitFor(() => expect(result.current.data).toBeNull());
});
