export function useIsSafari(): boolean {
  return globalThis?.navigator
    ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    : false;
}
