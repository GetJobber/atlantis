export interface Option {
  /**
   * Text to be displayed for the option
   *
   */
  label: string;

  /**
   * When set to true the option is checked by default
   *
   */
  checked: boolean;
}

export type Options = Array<Option>;
