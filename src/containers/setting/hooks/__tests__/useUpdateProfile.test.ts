import { act, renderHook, waitFor } from '@testing-library/react';
import { wrapperWithReactQuery } from '../../../../test-utils/testRender';
import { useUpdateProfile } from '../useUpdateProfile';
import { MockUser } from '../../../../test-utils/index.mock';

const mocks = vi.hoisted(() => {
  return {
    mutate: vi.fn(),
  };
});

vi.mock('../useUpdateProfile', async () => {
  return {
    useUpdateProfile: () => ({ mutate: mocks.mutate }),
  };
});

describe('useUpdateProfile', () => {
  test('User 정보를 업데이트한다.', async () => {
    const { result } = renderHook(() => useUpdateProfile(), {
      wrapper: wrapperWithReactQuery(),
    });

    await act(async () => {
      result.current.mutate({ ...MockUser, name: 'updated name' });
    });
    await waitFor(() => expect(mocks.mutate).toBeCalled());
    expect(result.current.data?.name).not.toEqual(MockUser.name);
  });
});
