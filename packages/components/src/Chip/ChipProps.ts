import React from "react";
import { IconNames } from "../Icon";
import { AvatarProps } from "../Avatar";

export type ChipProps = BaseChipProps;

interface BaseChipProps {
  label: string;
  onClick?(event: React.MouseEvent<HTMLElement>): void;
  avatar?: Avatar;
  icon?: IconNames;
  selected?: boolean;
  disabled?: boolean;
  dismissAction?: DismissibleAction;
}

export type Avatar = Exclude<AvatarProps, "size">;

export interface DismissibleAction {
  ariaLabel: string;
  onRequestDismiss(event: React.MouseEvent<HTMLElement>): void;
}
