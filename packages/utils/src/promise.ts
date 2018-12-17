/**
 * Create a promise that resolves after some amount of time
 * @param n number of milliseconds to wait before resolving promise
 */
export function timeout(n: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(resolve, n);
  });
}
