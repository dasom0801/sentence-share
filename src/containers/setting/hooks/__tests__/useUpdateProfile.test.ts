import { act, renderHook, waitFor } from '@testing-library/react';
import { wrapper } from '../../../../test-utils/testRender';
import useUpdateProfile from '../useUpdateProfile';
import { MockUser } from '../../../../test-utils/index.mock';

describe('useUpdateProfile', () => {
  test('User 정보를 업데이트한다.', async () => {
    const { result } = renderHook(() => useUpdateProfile(), {
      wrapper: wrapper(),
    });

    await act(async () => {
      result.current.mutate({ ...MockUser, name: 'updated name' });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.name).not.toEqual(MockUser.name);
  });
});
