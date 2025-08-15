import classNames from "classnames";
import type { CSSProperties, PropsWithChildren } from "react";
import React, { Children, forwardRef } from "react";
import styles from "./SegmentedControl.module.css";

export interface SegmentedControlBaseProps extends PropsWithChildren {
  readonly size?: "small" | "base" | "large";
}

const SegmentedControlBase = forwardRef<
  HTMLDivElement,
  SegmentedControlBaseProps
>(function SegmentedControlBase({ children, size = "base" }, ref) {
  const optionCount = Children.count(children);

  const containerClassNames = classNames(styles.container, {
    [styles.small]: size === "small",
    [styles.large]: size === "large",
  });

  return (
    <div
      ref={ref}
      className={containerClassNames}
      role="radiogroup"
      style={
        {
          "--segmentedControl--option-count": optionCount,
        } as CSSProperties
      }
    >
      {children}
      <span />
    </div>
  );
});

export { SegmentedControlBase };
