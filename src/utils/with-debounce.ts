export const withDebounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 2000
) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = undefined;
      fn(...args);
    }, delay);
  };
};
