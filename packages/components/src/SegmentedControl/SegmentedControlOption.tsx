import type { PropsWithChildren } from "react";
import React, { useId, useMemo } from "react";
import { useSegmentedControl } from "./SegmentedControlProvider";

interface SegmentedControlOptionProps<TValue extends string | number>
  extends PropsWithChildren {
  /**
   * The unique value associated with this option. This value is used to determine
   * which option is selected and is passed to the onSelectValue callback.
   */
  readonly value: TValue;

  /**
   * An aria-label that describes the option.
   */
  readonly ariaLabel?: string;
}

export function SegmentedControlOption<TValue extends string | number>({
  value,
  children,
  ariaLabel,
}: SegmentedControlOptionProps<TValue>) {
  const { selectedValue, handleChange, segmentedControlName } =
    useSegmentedControl<TValue>();
  const localChecked = useMemo(
    () => selectedValue === value,
    [selectedValue, value],
  );
  const inputId = `${value.toString()}_${useId()}`;

  return (
    <>
      <input
        type="radio"
        id={inputId}
        name={segmentedControlName}
        checked={localChecked}
        value={value as string}
        onChange={handleChange}
        aria-label={ariaLabel}
        tabIndex={localChecked ? 0 : -1}
      />
      <label htmlFor={inputId}>{children}</label>
    </>
  );
}
