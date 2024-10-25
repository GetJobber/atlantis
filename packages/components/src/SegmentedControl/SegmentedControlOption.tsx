import React, { PropsWithChildren, useId } from "react";
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
  readonly onSelect?: (value: TValue) => void;
}

export function SegmentedControlOption<TValue extends string | number>({
  value,
  children,
  ariaLabel,
  onSelect,
}: SegmentedControlOptionProps<TValue>) {
  const { selectedValue, onValueChange, name } = useSegmentedControl();
  const localChecked = selectedValue === value;
  const inputId = `${value.toString()}_${useId()}`;

  return (
    <>
      <input
        name={name}
        type="radio"
        id={inputId}
        checked={localChecked}
        value={value}
        onChange={handleChangeLocal}
        aria-label={ariaLabel}
      />
      <label htmlFor={inputId}>{children}</label>
    </>
  );

  function handleChangeLocal() {
    onSelect?.(value);
    onValueChange(value);
  }
}
