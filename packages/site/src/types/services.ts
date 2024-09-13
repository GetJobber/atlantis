export interface FormattedProp {
  value: string | number | Date | undefined;
  key: string;
  description: string;
  type: "string" | "boolean" | "option" | "callback" | "unknown";
  options?: Array<string>;
  id: string;
}

export interface DocProps {
  defaultProps: Array<FormattedProp>;
  defaultValues: Record<string, Record<string, string | number>>;
  Component: unknown;
  ComponentContent: unknown;
  code?: string;
}
export type ValueStateInternals = Record<
  string,
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    description: string;
    required: boolean;
    key?: string;
  }
>;
export type ValueState = Record<string, ValueStateInternals>;
export interface OptionInternalProps {
  value: FormattedProp;
  values: ValueStateInternals;
  updateValue: (key: { key: string }, value: string | (() => void)) => void;
}
export interface PropStructure {
  displayName: string;
  props: Record<string, { type: { name: string }; description: string }>;
}
