import React, { type PropsWithChildren, useId, useRef } from "react";
import { SegmentedControlProvider } from "./SegmentedControlProvider";
import { SegmentedControlOption } from "./SegmentedControlOption";
import { SegmentedControlBase } from "./SegmentedControlBase";

interface SegmentedControlProps<T> extends PropsWithChildren {
  /**
   * The currently selected option. Use this prop with `onSelectValue` for
   * a controlled component.
   */
  readonly selectedValue?: T;

  /**
   * A callback function that is called whenever the selected option changes.
   * Use this prop with `selectedValue` for a controlled component.
   */
  readonly onSelectValue?: (value: T) => void;

  /**
   * The default option to be selected initially.
   * Set this prop when the component is uncontrolled.
   */
  readonly defaultValue?: T;

  /**
   * A unique name for the SegmentedControl, that links the group of
   * options together. Can be a string or, if not set, will default to a generated
   * id.
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
