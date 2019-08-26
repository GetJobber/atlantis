declare class TimePolyfill {
  public constructor(input: HTMLInputElement);
}

declare module "time-input-polyfill" {
  export = TimePolyfill;
}

declare function supportsTime(): boolean;

declare module "time-input-polyfill/supportsTime" {
  export = supportsTime;
}
