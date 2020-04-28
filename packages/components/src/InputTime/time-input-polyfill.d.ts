// Declaring types for polyfill.
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
declare class TimePolyfill {
  public constructor(input: HTMLInputElement);
}

declare module "time-input-polyfill" {
  export = TimePolyfill;
}

declare module "time-input-polyfill/supportsTime" {
  export const supportsTime: boolean;
}
