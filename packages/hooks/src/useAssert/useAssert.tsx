interface Options {
  readonly warn: boolean;
}

export function useAssert(
  shouldShow: boolean,
  message: string,
  options?: Options,
) {
  if (true && shouldShow) {
    if (options?.warn) {
      console.warn(message);
    } else {
      throw new Error(message);
    }
  }
}
