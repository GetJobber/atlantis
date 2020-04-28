import React, { ReactNode } from "react";

export interface RadioOptionProps {
  readonly value: string;
  readonly name: string;
  readonly children: ReactNode;
  readonly checked: boolean | undefined;
  setSelected?(): void;
}

export function RadioOption({
  name,
  value,
  children,
  checked,
  setSelected,
}: RadioOptionProps) {
  return (
    <>
      <input
        onChange={setSelected}
        type="radio"
        name={name}
        value={value}
        checked={checked}
      />
      <label htmlFor={value}>{children}</label>
      <br />
    </>
  );
}
