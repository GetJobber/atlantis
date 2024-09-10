export interface FormattedProp {
  key: string;
  description: string;
  type: 'string' | 'boolean' | 'option' | 'callback' | 'unknown';
  options?: Array<string>;
  id: string;
}

export interface DocProps {
  defaultProps: Array<FormattedProp>;
  defaultValues: Record<string, Record<string, string | number>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any;
  ComponentContent: any;
  code?: string;
}
export type ValueStateInternals = Record<string, string | number | (() => void)>;
export type ValueState = Record<string, ValueStateInternals>;
export interface OptionInternalProps {
  value: FormattedProp;
  values: Record<string, string>;
  updateValue: (
    propKey: string,
    key: { key: string },
    value: string | (() => void),
  ) => void;
}