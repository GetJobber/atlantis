import { Select } from "@jobber/components";
import { OptionInternalProps } from "../types/services";

export const OptionInternal = ({
  value,
  values,
  keyIn,
  updateValue,
}: OptionInternalProps) => {
  return (
    <Select
      placeholder={keyIn}
      value={value}
      onChange={val => {
        updateValue(keyIn || "", val as string);
      }}
    >
      {values.map((option, index) => {
        return (
          <option key={index} value={option}>
            {option}
          </option>
        );
      })}
    </Select>
  );
};
