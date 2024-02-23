import { renderHook } from '@testing-library/react';
import useProfileImageEdit from '.';

import { act } from 'react-dom/test-utils';
import { wrapper } from '../../../../test-utils/testRender';

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(() => ({
    ref: jest.fn(() => ({
      put: jest.fn(() => Promise.resolve({})),
    })),
  })),
  uploadBytes: jest.fn(),
  ref: jest.fn(),
}));

describe('useProfileImageEdit', () => {
  it('이미지 파일을 첨부하면 ProfileUrl을 갱신한다.', async () => {
    // 테스트용 Blob 파일
    const imageBlob = new Blob(['test image'], { type: 'image/png' });
    const imageFile = new File([imageBlob], 'testImage.png');
    const { result } = renderHook(() => useProfileImageEdit(), {
      wrapper: wrapper(),
    });

    await act(async () => {
      result.current.setImageFile(imageFile);
    });
    // TODO: test
  });
});
