import React, { PropsWithChildren, useId, useMemo } from "react";
import { useSegmentedControl } from "./SegmentedControlProvider";

interface SegmentedControlOptionProps<TValue extends string | number>
  extends PropsWithChildren {
  /**
   * The unique value associated with this option. This value is used to determine
   * which option is selected and is passed to the onSelectOption callback.
   */
  readonly value: TValue;

  /**
   * An aria-label that describes the option. Can be placed within
   * SegmentedControl.Option.
   */
  readonly ariaLabel?: string;
}

export function SegmentedControlOption<TValue extends string | number>({
  value,
  children,
  ariaLabel,
}: SegmentedControlOptionProps<TValue>) {
  const { selectedValue, handleChange } = useSegmentedControl<TValue>();
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
