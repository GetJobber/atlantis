type OptionValue = string | number;

export interface Option {
  heading?: boolean;
  value?: OptionValue;
  label: string;
  description?: string;
  details?: string;
}
