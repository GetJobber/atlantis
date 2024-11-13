import React, { type PropsWithChildren, useId, useRef } from "react";
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

  /**
   * A unique name for the SegmentedControl, that links the group of
   * options together.
   *
   * @default useId()
   */
  readonly name?: string;
}

export function SegmentedControl<T>({
  selectedValue,
  onSelectValue,
  defaultValue,
  children,
  name = useId(),
}: SegmentedControlProps<T>) {
  const container = useRef<HTMLDivElement>(null);
  console.log("name", name);

  return (
    <SegmentedControlProvider
      selectedValue={selectedValue}
      onSelectValue={onSelectValue}
      defaultValue={defaultValue}
      name={name}
    >
      <SegmentedControlBase ref={container}>{children}</SegmentedControlBase>
    </SegmentedControlProvider>
  );
}

SegmentedControl.Option = SegmentedControlOption;
SegmentedControl.Base = SegmentedControlBase;
