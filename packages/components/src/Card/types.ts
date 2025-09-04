import type { CSSProperties, ReactElement, ReactNode } from "react";
import type colors from "./cardcolors.module.css";
import { type ButtonProps } from "../Button";
import { type MenuProps } from "../Menu";

export type ActionProps = ReactElement<
  Omit<ButtonProps, "size" | "fullWidth"> | MenuProps
>;

export interface HeaderActionProps {
  /**
   * The title of the card.
   */
  readonly title?: string;
  /**
   * The action props that renders into a button on the card header.
   */
  readonly action?: ActionProps;
}

export type elevationProp = "none" | "low" | "base" | "high";

export interface CardProps {
  /**
   * The `accent`, if provided, will effect the color accent at the top of
   * the card.
   */
  readonly accent?: keyof typeof colors;
  readonly children: ReactNode | ReactNode[];
  /**
   * @deprecated
   * Use header instead.
   */
  readonly title?: string;

  /**
   * The header props of the card.
   */
  readonly header?: string | HeaderActionProps | ReactElement;
  readonly elevation?: elevationProp;

  /**
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    container?: string;
    header?: string;
  };

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    container?: CSSProperties;
    header?: CSSProperties;
  };
}

export interface CardHeaderProps {
  readonly children: ReactNode;
  /**
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    header?: string;
  };

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    header?: CSSProperties;
  };
}

export interface CardBodyProps {
  readonly children: ReactNode;
}

export interface CardCompositionProps {
  Header: React.FC<CardHeaderProps>;
  Body: React.FC<CardBodyProps>;
}
