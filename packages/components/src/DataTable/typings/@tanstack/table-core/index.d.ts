/* eslint-disable @typescript-eslint/no-explicit-any */
import "@tanstack/table-core";

declare module "@tanstack/table-core" {
  type DeepValue<T, TProp> = T extends Record<string | number, any>
    ? TProp extends () => infer TBranch | infer TDeepProp
      ? DeepValue<T[TBranch], TDeepProp>
      : T[TProp & string]
    : never;
}
