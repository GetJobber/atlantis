import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import styles from "./Autocomplete.css";
import { Menu } from "./Menu";
import { Option } from "./Option";
import { InputText, InputTextRef } from "../InputText";

interface AutocompleteProps {
  readonly initialOptions?: Option[];
  value: Option | undefined;
  onChange(newValue?: Option): void;
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
  const [options, setOptions] = useState(initialOptions);
  const [optionsMenuVisible, setOptionsMenuVisible] = useState(false);
  const [text, setText] = useState((value && value.label) || "");
  const inputRef = useRef() as MutableRefObject<InputTextRef>;

  useEffect(() => {
    if (value) {
      setText(value.label);
    } else {
      setText("");
      setOptions(initialOptions);
    }
  }, [value]);

  return (
    <div className={styles.autocomplete}>
      <InputText
        value={text}
        onChange={textChange}
        placeholder={placeholder}
        onFocus={handleTextFocus}
        onBlur={handleTextBlur}
        ref={inputRef}
      />
      <Menu
        visible={optionsMenuVisible}
        options={options}
        selectedOption={value}
        onOptionSelect={selectOption}
      />
    </div>
  );

  function selectOption(chosenOption: Option) {
    onSelectOption(chosenOption);
    textChange(chosenOption.label);
    setOptionsMenuVisible(false);
  }

  async function textChange(newText: string) {
    setOptionsMenuVisible(true);
    setText(newText);
    if (newText) {
      setOptions(await getOptions(newText));
    } else {
      setOptions(initialOptions);
    }
  }

  function handleTextBlur() {
    setOptionsMenuVisible(false);
    if (value == undefined || value.label !== text) {
      onSelectOption(undefined);
    }
  }

  function handleTextFocus() {
    setOptionsMenuVisible(true);
  }
}
