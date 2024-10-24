import React, { type PropsWithChildren, useRef } from "react";
import { SegmentedControlProvider } from "./SegmentedControlProvider";
import { SegmentedControlOption } from "./SegmentedControlOption";
import { SegmentedControlBase } from "./SegmentedControlBase";

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
