import debounce from './debounce';

describe('debounce', () => {
  jest.useFakeTimers();

  test('should call the debounced function after the specified delay', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn();
    expect(mockFn).not.toBeCalled();

    jest.advanceTimersByTime(1000);
    expect(mockFn).toBeCalled();
  });

  test('should not call the debounced function before the delay expires', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn();
    debouncedFn();

    jest.advanceTimersByTime(999);
    expect(mockFn).not.toBeCalled();
  });

  test('should cancel the previous call if a new call is made before delay expires', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn();
    debouncedFn();

    jest.advanceTimersByTime(999);
    expect(mockFn).not.toBeCalled();

    jest.advanceTimersByTime(1000);
    expect(mockFn).toBeCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});
