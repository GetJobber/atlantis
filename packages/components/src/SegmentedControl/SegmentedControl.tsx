import React, {
  Children,
  type PropsWithChildren,
  useEffect,
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

export function SegmentedControl<T>({
  onSelectOption,
  defaultOption,
  children,
}: SegmentedControlProps<T>) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const length = Children.count(children);

    if (container.current) {
      container.current.style.setProperty(
        "--segmentedControl--option-count",
        String(length),
      );
    }
  }, [children]);

  return (
    <SegmentedControlProvider
      onSelectOption={onSelectOption}
      defaultOption={defaultOption}
    >
      <div ref={container} className={styles.container}>
        {children}
        <span />
      </div>
    </SegmentedControlProvider>
  );
}

SegmentedControl.Option = SegmentedControlOption;
