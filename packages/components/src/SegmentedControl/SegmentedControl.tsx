import React, { CSSProperties, Children, type PropsWithChildren } from "react";
import { useControllableState } from "@jobber/hooks";
import { SegmentedControlProvider } from "./SegmentedControlProvider";
import { SegmentedControlOption } from "./SegmentedControlOption";
import styles from "./SegmentedControl.module.css";

interface SegmentedControlProps<TValue extends string | number>
  extends PropsWithChildren {
  /**
   * A unique name for the SegmentedControl. This is used to group the radio buttons
   */
  readonly name?: string;

  /**
   * The currently selected option
   */
  readonly defaultValue?: TValue;

  /**
   * A callback function that is called whenever the selected option changes
   */
  readonly onValueChange?: (value: TValue) => void;

  /**
   * The default option to be selected initially
   */
  readonly value?: TValue;
}

export function SegmentedControl<TValue extends string | number>({
  onValueChange,
  defaultValue,
  value: valueProp,
  name,
  children,
}: SegmentedControlProps<TValue>) {
  const [value, setValue] = useControllableState({
    defaultProp: defaultValue,
    onChange: onValueChange,
    prop: valueProp,
  });

  const optionCount = Children.count(children);

  return (
    <SegmentedControlProvider<TValue>
      onValueChange={setValue}
      selectedValue={value}
      name={name}
    >
      <div
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
    </SegmentedControlProvider>
  );
}

SegmentedControl.Option = SegmentedControlOption;
