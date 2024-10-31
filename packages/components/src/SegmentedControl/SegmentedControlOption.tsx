import React, { PropsWithChildren, useId, useMemo } from "react";
import { useSegmentedControl } from "./SegmentedControlProvider";

interface SegmentedControlOptionProps extends PropsWithChildren {
  /**
   * The unique value associated with this option. This value is used to determine
   * which option is selected and is passed to the onSelectOption callback.
   */
  readonly value: string | number;

  /**
   * An aria-label that describes the option. Can be placed within
   * SegmentedControl.Option.
   */
  readonly ariaLabel?: string;
}

export function SegmentedControlOption({
  value,
  children,
  ariaLabel,
}: SegmentedControlOptionProps) {
  const { selectedOption, handleChange } = useSegmentedControl();
  const localChecked = useMemo(
    () => selectedOption === value,
    [selectedOption, value],
  );
  const inputId = `${value.toString()}_${useId()}`;

  return (
    <>
      <input
        type="radio"
        id={inputId}
        checked={localChecked}
        value={value}
        onChange={handleChange}
        aria-label={ariaLabel}
      />
      <label htmlFor={inputId}>{children}</label>
    </>
  );
}
