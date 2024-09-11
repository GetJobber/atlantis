export interface FormattedProp {
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
  string | number | (() => void)
>;
export type ValueState = Record<string, ValueStateInternals>;
export interface OptionInternalProps {
  value: FormattedProp;
  values: ValueStateInternals;
  updateValue: (
    propKey: string,
    key: { key: string },
    value: string | (() => void),
  ) => void;
}
export interface PropStructure {
  displayName: string;
  props: Record<string, { type: { name: string }; description: string }>;
}
