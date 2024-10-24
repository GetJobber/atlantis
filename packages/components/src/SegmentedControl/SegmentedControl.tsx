import React, {
  CSSProperties,
  Children,
  type PropsWithChildren,
  forwardRef,
  useRef,
} from "react";
import styles from "./SegmentedControl.module.css";
import { SegmentedControlProvider } from "./SegmentedControlProvider";
import { SegmentedControlOption } from "./SegmentedControlOption";

interface SegmentedControlProps<T> extends PropsWithChildren {
  /**
   * The currently selected option
   */
  readonly selectedOption: T;

  /**
   * A callback function that is called whenever the selected option changes
   */
  readonly onSelectOption: (view: T) => void;

  /**
   * The default option to be selected initially
   */
  readonly defaultOption: T;
}
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

export function SegmentedControl<T>({
  onSelectOption,
  defaultOption,
  children,
}: SegmentedControlProps<T>) {
  const container = useRef<HTMLDivElement>(null);

  return (
    <SegmentedControlProvider
      onSelectOption={onSelectOption}
      defaultOption={defaultOption}
    >
      <SegmentedControlBase ref={container}>{children}</SegmentedControlBase>
    </SegmentedControlProvider>
  );
}

SegmentedControl.Option = SegmentedControlOption;
SegmentedControl.Base = SegmentedControlBase;
