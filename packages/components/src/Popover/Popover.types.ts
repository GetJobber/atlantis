import { CSSProperties, PropsWithChildren } from "react";
import { XOR } from "ts-xor";
import { ButtonDismissProps } from "../ButtonDismiss";

export interface PopoverProps {
  /**
   * Element the Popover will attach to and point at. A `useRef` must be attached to an html element
   * and passed as an attachTo prop in order for the Popover to function properly
   */
  readonly attachTo: Element | React.RefObject<Element | null>;

  /**
   * Popover content.
   */
  readonly children: React.ReactNode;

  /**
   * Control Popover visibility.
   */
  readonly open: boolean;

  /**
   * The strategy to use for the Popover.
   * @default 'absolute'
   */
  readonly strategy?: "absolute" | "fixed";

  /**
   * Callback executed when the user wants to close/dismiss the Popover
   */
  readonly onRequestClose?: () => void;

  /**
   * Describes the preferred placement of the Popover.
   * @default 'auto'
   */
  readonly preferredPlacement?: "top" | "bottom" | "left" | "right" | "auto";

  /**
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    container?: string;
    dismissButtonContainer?: string;
    arrow?: string;
  };

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    container?: CSSProperties;
    dismissButtonContainer?: CSSProperties;
    arrow?: CSSProperties;
  };
}

export type PopoverProviderProps = PropsWithChildren<
  Pick<
    PopoverProps,
    "preferredPlacement" | "attachTo" | "open" | "strategy"
  > & {
    /**
     * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
     * **last resort**. Using this may result in unexpected side effects.
     * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
     */
    readonly UNSAFE_className?: {
      container?: string;
    };

    /**
     * **Use at your own risk:** Custom style for specific elements. This should only be used as a
     * **last resort**. Using this may result in unexpected side effects.
     * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
     */
    readonly UNSAFE_style?: {
      container?: CSSProperties;
    };
  }
>;

interface PopoverDismissButtonBaseProps {
  /**
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    dismissButtonContainer?: string;
  };

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    dismissButtonContainer?: CSSProperties;
  };
}

interface PopoverDismissButtonWithChildren
  extends PopoverDismissButtonBaseProps {
  readonly children: React.ReactNode;
}

type PopoverDismissButtonWithoutChildren = Partial<ButtonDismissProps> & {
  readonly children?: never;
} & PopoverDismissButtonBaseProps;

export type PopoverDismissButtonProps = XOR<
  PopoverDismissButtonWithChildren,
  PopoverDismissButtonWithoutChildren
>;

export interface PopoverArrowProps {
  /**
   * **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    arrow?: string;
  };

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    arrow?: CSSProperties;
  };
}
