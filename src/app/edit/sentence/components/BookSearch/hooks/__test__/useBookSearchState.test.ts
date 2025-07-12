import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useBookSearchState } from '../useBookSearchState';

// debounce 동작하지 않도록 함
vi.mock('use-debounce', () => ({
  useDebouncedCallback: (fn: any) => fn,
}));

describe('useBookSearchState', () => {
  const setup = () => {
    const { result } = renderHook(() => useBookSearchState());
    return { result };
  };
  it('input 변경 시 input 상태를 업데이트 한다.', () => {
    const { result } = setup();
    act(() => {
      result.current.handleInputChange({ target: { value: 'input' } } as any);
    });

    expect(result.current.input).toBe('input');
    expect(result.current.search).toBe('input');
  });

  it('handleFocus 호출 시 focused가 true가 된다.', () => {
    const { result } = setup();
    act(() => result.current.handleFocus());
    expect(result.current.focused).toBe(true);
  });

  it('handleBlur 호출 시 focused가 blur가 된다.', () => {
    const { result } = setup();
    act(() => result.current.handleBlur());
    expect(result.current.focused).toBe(false);
  });

  it('clearSearch는 모든 상태를 초기화한다.', () => {
    const { result } = setup();
    act(() => result.current.clearSearch());
    expect(result.current.focused).toBe(false);
    expect(result.current.input).toBe('');
    expect(result.current.search).toBe('');
  });

  it('리스트는 포커스 상태이면서 search keyword가 있을 때 보여진다.', () => {
    const { result } = setup();
    act(() => {
      result.current.handleFocus();
      result.current.handleInputChange({ target: { value: 'search' } } as any);
    });
    expect(result.current.shouldShowList).toBe(true);
  });
});
