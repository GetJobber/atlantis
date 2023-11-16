export type RawTextInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export interface InputCurrencyProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  currencySymbol?: string;
  readonly decimalPlaces?: number;
  readonly maximumDecimalPlaces?: number;
}

export interface InputCurrencyRef {
  blur(): void;
  focus(): void;
}
