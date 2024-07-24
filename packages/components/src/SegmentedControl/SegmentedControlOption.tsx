import React, { PropsWithChildren, useId, useMemo } from "react";
import { useSegmentedControl } from "./SegmentedControlProvider";

interface SegmentedControlOptionProps extends PropsWithChildren {
  /**
   * The value of the option.
   */
  readonly value: string | number;
  /**
   * The label to appear beside the radio button.
   */
  readonly checked?: boolean;
  readonly label?: string;
  readonly onChange?: (valueIn: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SegmentedControlOption({
  value,
  checked,
  children,
  label,
  onChange,
}: SegmentedControlOptionProps) {
  const { selectedOption, handleChange } = useSegmentedControl();
  const localChecked = useMemo(() => {
    return checked ?? selectedOption === value;
  }, [selectedOption, checked]);
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
