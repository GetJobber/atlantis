import React, { useEffect, useState } from "react";
import styles from "./Autocomplete.css";
import { Menu } from "./Menu";
import { Option } from "./Option";
import { InputText } from "../InputText";

interface AutocompleteProps {
  readonly initialOptions?: Option[];
  readonly value: Option | undefined;
  readonly placeholder: string;
  onChange(newValue?: Option): void;
  getOptions(newValue: string): Option[] | Promise<Option[]>;
}

export function Autocomplete({
  initialOptions = [],
  value,
  onChange,
  getOptions,
  placeholder,
}: AutocompleteProps) {
  const [options, setOptions] = useState(initialOptions);
  const [menuVisible, setMenuVisible] = useState(false);
  const [inputText, setInputText] = useState((value && value.label) || "");

  useEffect(() => {
    if (value) {
      updateInput(value.label);
    } else {
      updateInput("");
    }
  }, [value]);

  return (
    <div className={styles.autocomplete}>
      <InputText
        value={inputText}
        onChange={inputChange}
        placeholder={placeholder}
        onFocus={inputFocus}
        onBlur={inputBlur}
      />
      <Menu
        visible={menuVisible}
        options={options}
        selectedOption={value}
        onOptionSelect={menuChange}
      />
    </div>
  );

  function menuChange(chosenOption: Option) {
    onChange(chosenOption);
    updateInput(chosenOption.label);
    setMenuVisible(false);
  }

  function inputChange(newText: string) {
    updateInput(newText);
    setMenuVisible(true);
  }

  async function updateInput(newText: string) {
    setInputText(newText);
    if (newText) {
      setOptions(await getOptions(newText));
    } else {
      setOptions(initialOptions);
    }
  }

  function inputBlur() {
    setMenuVisible(false);
    if (value == undefined || value.label !== inputText) {
      onChange(undefined);
    }
  }

  function inputFocus() {
    setMenuVisible(true);
  }
}
