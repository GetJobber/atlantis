import React, { PropsWithChildren, useId, useMemo } from "react";
import { useSegmentedControl } from "./SegmentedControlProvider";

interface SegmentedControlOptionProps extends PropsWithChildren {
  /**
   * The unique value associated with this option. This value is used to determine
   * which option is selected and is passed to the onSelectOption callback.
   */
  readonly value: string | number;

  /**
   * The text label for the option. If no label is provided, the children
   * of the component will be used as the label.
   */
  readonly label?: string;

  /**
   * An aria-label that describes the option. Can be placed within
   * SegmentedControl.Option.
   */
  readonly ariaLabel?: string;

  /**
   * A callback function that is called whenever this option is selected.
   */
  readonly onSelected?: (valueIn: string | number) => void;
}

export function SegmentedControlOption({
  value,
  children,
  label,
  ariaLabel,
  onSelected,
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
        onChange={handleChangeLocal}
        aria-label={ariaLabel}
      />
      <label htmlFor={inputId}>{children || label}</label>
    </>
  );

  function handleChangeLocal(valueIn: React.ChangeEvent<HTMLInputElement>) {
    onSelected?.(value);
    handleChange?.(valueIn);
  }
}
