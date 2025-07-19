import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';
import { useClickOutside } from '../useClickOutside';

function TestComponent({ onOutsideClick }: { onOutsideClick: () => void }) {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  useClickOutside([ref1, ref2], onOutsideClick);

  return (
    <div>
      <div ref={ref1} data-testid="ref1">
        Inside
      </div>
      <div ref={ref2} data-testid="ref2">
        Inside
      </div>
      <div data-testid="outside">Outside</div>
    </div>
  );
}

describe('useClickOutside', () => {
  let mockFn: ReturnType<typeof vi.fn>;

  const setup = (onOutsideClick: () => void) => {
    const user = userEvent.setup();
    render(<TestComponent onOutsideClick={onOutsideClick} />);
    return { user };
  };

  beforeEach(() => {
    mockFn = vi.fn();
  });

  it('바깥 영역을 클릭하면 callback을 호출한다.', async () => {
    const { user } = setup(mockFn);
    await user.click(screen.getByTestId('outside'));
    expect(mockFn).toHaveBeenCalledOnce();
  });

  it.each(['ref1', 'ref2'])(
    '%s 영역을 클릭하면 callback이 호출되지 않는다.',
    async (ref) => {
      const { user } = setup(mockFn);
      await user.click(screen.getByTestId(ref));
      expect(mockFn).not.toHaveBeenCalled();
    },
  );
});
