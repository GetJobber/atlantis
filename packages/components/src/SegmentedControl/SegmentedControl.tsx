import React, { type PropsWithChildren, useRef } from "react";
import { SegmentedControlProvider } from "./SegmentedControlProvider";
import { SegmentedControlOption } from "./SegmentedControlOption";
import { SegmentedControlBase } from "./SegmentedControlBase";

interface SegmentedControlProps<T> extends PropsWithChildren {
  /**
   * The currently selected option
   */
  readonly selectedValue?: T;

  /**
   * A callback function that is called whenever the selected option changes
   */
  readonly onSelectValue?: (value: T) => void;

  /**
   * The default option to be selected initially
   */
  readonly defaultValue?: T;
}

export function SegmentedControl<T>({
  selectedValue,
  onSelectValue,
  defaultValue,
  children,
}: SegmentedControlProps<T>) {
  const container = useRef<HTMLDivElement>(null);

  return (
    <SegmentedControlProvider
      selectedValue={selectedValue}
      onSelectValue={onSelectValue}
      defaultValue={defaultValue}
    >
      <SegmentedControlBase ref={container}>{children}</SegmentedControlBase>
    </SegmentedControlProvider>
  );
}

SegmentedControl.Option = SegmentedControlOption;
SegmentedControl.Base = SegmentedControlBase;
