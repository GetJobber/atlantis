import { InputTextShimProps } from "../InputText";

type InputTimeBaseProps = Omit<
  InputTextShimProps,
  "value" | "defaultValue" | "onChange" | "rows" | "type" | "onChangeValue" // Also omit onChangeValue from InputTextProps
> & {
  value?: Date;
  defaultValue?: Date;
  onChange?: (value?: Date) => void;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  readOnly?: boolean;
};

export type InputTimeLegacyProps = InputTimeBaseProps & {
  version?: 1;
};

export type InputTimeRebuiltProps = InputTimeBaseProps & {
  version: 2;
};

export type InputTimeProps = InputTimeLegacyProps | InputTimeRebuiltProps;
