import { ReactElement } from "react";
import {
  ButtonGroupActionProps,
  ButtonGroupPrimaryActionProps,
  ButtonGroupSecondaryActionProps,
  PrimaryAction,
  SecondaryAction,
} from "./ButtonGroupAction";

export type ButtonGroupPrimaryActionElement = ReactElement<
  ButtonGroupPrimaryActionProps,
  typeof PrimaryAction
>;

export type ButtonGroupSecondaryActionElement = ReactElement<
  ButtonGroupActionProps,
  typeof SecondaryAction
>;

export type ButtonGroupActionElement =
  | ButtonGroupPrimaryActionElement
  | ButtonGroupSecondaryActionElement;

export type BottomSheetTextTransform = "capitalize" | "none";

export type {
  ButtonGroupActionProps,
  ButtonGroupPrimaryActionProps,
  ButtonGroupSecondaryActionProps,
};
