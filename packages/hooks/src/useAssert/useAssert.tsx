import process from "process";

interface Options {
  readonly warn: boolean;
}

export function useAssert(
  shouldShow: boolean,
  message: string,
  options?: Options,
) {
  if (process.env.NODE_ENV !== "production" && shouldShow) {
    if (options?.warn) {
      console.warn(message);
    } else {
      throw new Error(message);
    }
  }
}
