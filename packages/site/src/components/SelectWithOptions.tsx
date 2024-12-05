import { Select } from "@jobber/components";
import { SelectWithOptionsProps } from "../types/services";

/**
 * An opinionated wrapper for our Select component. We could just use Select and Options on their own
 * but this was created to make the code a bit more readable. If this bothers you, feel free to remove it!
 * @param SelectWithOptionsProps
 * @returns ReactNode
 */
export const SelectWithOptions = ({
  value,
  values,
  keyIn,
  updateValue,
}: SelectWithOptionsProps) => {
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
