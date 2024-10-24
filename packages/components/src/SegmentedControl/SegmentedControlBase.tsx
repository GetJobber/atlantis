import React, {
  CSSProperties,
  Children,
  PropsWithChildren,
  forwardRef,
} from "react";
import styles from "./SegmentedControl.module.css";

const SegmentedControlBase = forwardRef<HTMLDivElement, PropsWithChildren>(
  function SegmentedControlBase({ children }, ref) {
    const optionCount = Children.count(children);

    return (
      <div
        ref={ref}
        className={styles.container}
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
  },
);

export { SegmentedControlBase };
