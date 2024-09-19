/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select } from "@jobber/components";
import { OptionInternalProps } from "../types/services";

export const OptionInternal = ({
  value,
  values,
  updateValue,
}: OptionInternalProps) => {
  return (
    <Select
      placeholder={value.key}
      value={value.value}
      onChange={val => {
        updateValue(values.key as any, val as string);
      }}
    >
      {values.options?.map((option: any, index: any) => {
        return (
          <option key={index} value={option}>
            {option}
          </option>
        );
      })}
    </Select>
  );
};
