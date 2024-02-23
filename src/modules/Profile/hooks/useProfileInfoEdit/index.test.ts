import { act, renderHook, waitFor } from '@testing-library/react';
import { wrapper } from '../../../../test-utils/testRender';
import useProfileInfoEdit from '.';
import { MockUser } from '../../../../test-utils/index.mock';

describe('Profile > hooks > useUpdateUser', () => {
  test('User 정보를 업데이트한다.', async () => {
    const { result } = renderHook(() => useProfileInfoEdit(), {
      wrapper: wrapper(),
    });

    await act(async () => {
      result.current.mutate({ ...MockUser, name: 'updated name' });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.name).not.toEqual(MockUser.name);
  });
});
