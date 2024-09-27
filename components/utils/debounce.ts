type DebounceFunction = (...args: any[]) => void;

const debounce = (func: DebounceFunction, delay: number): DebounceFunction => {
  let timerId: NodeJS.Timeout | undefined;

  return function (...args: any[]) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export default debounce;
