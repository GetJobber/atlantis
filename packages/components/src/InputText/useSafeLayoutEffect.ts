import React from "react";

const canUseDom = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

// safe to disable eslint here because we want a function that does nothing
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const useSafeLayoutEffect = canUseDom ? React.useLayoutEffect : () => {};
