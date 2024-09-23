export interface FormattedProp extends ValueStateInternal {
  id?: string;
  type:
    | "string"
    | "boolean"
    | "option"
    | "callback"
    | "unknown"
    | { name: string }
    | string;
  options?: Array<string | undefined>;
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
  ValueStateInternal | undefined
>;

export interface ValueStateInternal {
  type: { name: string; includes?: string } | string;
  value?: string | number | Date | boolean;
  description: string;
  required: boolean;
  key?: string;
  defaultValue?: string | number | Date;
}

export type ValueState = Record<string, ValueStateInternals>;
export interface SelectWithOptionsProps {
  value: string;
  keyIn: string;
  values: Array<string>;
  updateValue: (key: string, value: string) => void;
}
export interface PropStructure {
  displayName: string;
  props: Record<string, { type: { name: string }; description: string }>;
}
