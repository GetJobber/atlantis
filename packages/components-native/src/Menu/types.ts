import { IconColorNames, IconNames } from "@jobber/design";
import { TextAlign } from "../Typography";

export interface MenuOptionProps {
  readonly label: string;
  readonly icon?: IconNames;
  readonly iconColor?: IconColorNames;
  readonly textAlign?: TextAlign;
  readonly destructive?: boolean;
  readonly textTransform?: "none" | "capitalize";
  onPress: () => void;
}

export interface MenuOptionInternalProps extends MenuOptionProps {
  setOpen: (bool: boolean) => void;
}

export interface MenuProps {
  readonly menuOptions?: MenuOptionProps[];
  readonly customActivator?: JSX.Element;
}

export interface OverlayProp {
  setOpen: (bool: boolean) => void;
}
