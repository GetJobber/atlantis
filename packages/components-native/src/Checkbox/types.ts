import { ReactElement } from "react";
import { Checkbox, CheckboxProps } from "./Checkbox";

export interface CheckboxGroupChildrenState {
  [key: string]: boolean;
}

export interface CheckboxGroupState {
  parentChecked?: boolean;
  childrenChecked: CheckboxGroupChildrenState;
}
export type CheckboxGroupStateInitializer = string[];
export type CheckboxElement = ReactElement<CheckboxProps, typeof Checkbox>;
