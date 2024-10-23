import React, { PropsWithChildren, useId, useMemo } from "react";
import { useSegmentedControl } from "./SegmentedControlProvider";

interface SegmentedControlOptionProps extends PropsWithChildren {
  /**
   * The value of the option.
   */
  readonly value: string | number;
  readonly label?: string;
  readonly onChange?: (valueIn: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SegmentedControlOption({
  value,
  children,
  label,
  onChange,
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
      />
      <label htmlFor={inputId}>{children || label}</label>
    </>
  );

  function handleChangeLocal(valueIn: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(valueIn);
    handleChange?.(valueIn);
  }
}
