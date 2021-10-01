interface Options {
  readonly warn: boolean;
}

export function useAssert(
  condition: boolean,
  message: string,
  options?: Options,
) {
  if (condition && !options?.warn) {
    throw new Error(message);
  } else if (condition && options?.warn) {
    console.warn(message);
  }
}
