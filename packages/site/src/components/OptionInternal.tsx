import { OptionInternalProps } from "../types/services";
import {
  InlineLabel,
  Select,
} from '@jobber/components';

export const OptionInternal = ({
  value,
  values,
  updateValue,
}: OptionInternalProps) => {
  return (
    <>
      {value.description && <InlineLabel>{value.description}</InlineLabel>}

      <Select
        placeholder={value.key}
        value={values[value.key]}
        onChange={val => {
          updateValue('options', { key: value.key }, val as string);
        }}>
        {value.options?.map((option, index) => {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </Select>
    </>
  );
};