import React from "react";
import classnames from "classnames";
import styles from "./Divider.module.css";
import sizes from "./DividerSizes.module.css";
import directions from "./DividerDirections.module.css";

interface DividerProps {
  /**
   * The weight of the divider.
   *
   * @default "base"
   */
  readonly size?: keyof typeof sizes;

  /**
   * The direction of the divider
   *
   * @default "horizontal"
   */
  readonly direction?: keyof typeof directions;

  /**
   * A reference to the element in the rendered output
   */
  readonly testID?: string;

  /**
   * **Use at your own risk:** Custom classNames for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    readonly container?: string;
  };

  /**
   * **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    readonly container?: React.CSSProperties;
  };
}

export function Divider({
  size = "base",
  direction = "horizontal",
  testID,
  UNSAFE_className,
  UNSAFE_style,
}: DividerProps) {
  const className = classnames(
    styles.divider,
    sizes[size],
    directions[direction],
    UNSAFE_className?.container,
  );

  return (
    <div
      className={className}
      style={UNSAFE_style?.container}
      data-testid={testID}
      role="none presentation"
    />
  );
}
