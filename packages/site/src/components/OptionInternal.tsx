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
        updateValue(values.key || "", val as string);
      }}
    >
      {values.options?.map((option, index) => {
        return (
          <option key={index} value={option}>
            {option}
          </option>
        );
      })}
    </Select>
  );
};
