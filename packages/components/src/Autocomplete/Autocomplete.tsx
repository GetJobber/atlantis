import React, { useState } from "react";
// import styles from "./Autocomplete.css";
import { InputText } from "../InputText";

type OptionValue = string | number;

interface Option {
  value: OptionValue;
  label: string;
}

interface AutocompleteProps {
  readonly initialOptions?: Option[];
  value: OptionValue;
  onChange(newValue: OptionValue): void;
  getOptions(newValue: string): Promise<Option[]>;
  placeholder: string;
}

export function Autocomplete({
  initialOptions = [],
  value,
  onChange: onSelectOption,
  getOptions,
  placeholder,
}: AutocompleteProps) {
  const [text, setText] = useState(value);
  const [options, setOptions] = useState(initialOptions);

  return (
    <>
      <InputText
        value={text}
        onChange={handleOnChange}
        placeholder={placeholder}
      />
      <ul>
        {options.map(option => {
          return (
            <li key={option.value} onClick={chooseThing(option)}>
              {option.label}
            </li>
          );
        })}
      </ul>
    </>
  );

  function chooseThing(choosenOption: Option) {
    return () => {
      onSelectOption(choosenOption.value);
      setText(choosenOption.label);
    };
  }

  async function handleOnChange(newValue: string) {
    setText(newValue);
    const results = await getOptions(newValue);
    setOptions(results);
  }
}
