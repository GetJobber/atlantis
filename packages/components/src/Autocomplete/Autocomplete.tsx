import React, { useState } from "react";
// import styles from "./Autocomplete.css";
import { InputText } from "../InputText";

interface Option {
  value: string | number;
  label: string;
}

interface AutocompleteProps {
  readonly initialOptions?: Option[];
  value: string | number;
  onChange(newValue: string | number): void;
  getOptions(newValue: string): Option[];
  placeholder: string;
}

export function Autocomplete({
  initialOptions = [],
  value,
  // onChange: onSelectOption,
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
          return <li key={option.value}>{option.value}</li>;
        })}
      </ul>
    </>
  );

  async function handleOnChange(newValue: string) {
    setText(newValue);
    const results = await getOptions(newValue);
    setOptions(results);
  }
}
