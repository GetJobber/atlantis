import { ReactNode } from "react";
import sizes from "./Sizes.css";
import { ButtonProps } from "../Button";

export interface ModalProps {
  /**
   * @default false
   */
  readonly title?: string;
  readonly open?: boolean;
  readonly size?: keyof typeof sizes;

  /**
   * @default true
   */
  readonly dismissible?: boolean;
  readonly children?: ReactNode;
  readonly primaryAction?: ButtonProps;
  readonly secondaryAction?: ButtonProps;
  readonly tertiaryAction?: ButtonProps;
  onRequestClose?(): void;
}
