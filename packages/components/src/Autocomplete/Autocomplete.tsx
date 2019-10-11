import React, { useEffect, useState } from "react";
import styles from "./Autocomplete.css";
import { InputText } from "../InputText";
import { select } from "../Select/Select.css";

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

enum IndexChange {
  Previous = -1,
  Next = 1,
}

export function Autocomplete({
  initialOptions = [],
  value = "",
  onChange: onSelectOption,
  getOptions,
  placeholder,
}: AutocompleteProps) {
  const [text, setText] = useState(value);
  const [options, setOptions] = useState(initialOptions);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
      const optionsLength = options.length;
      if (optionsLength === 0) {
        return;
      }
      if (event.key === "ArrowDown" && selectedIndex < optionsLength - 1) {
        setSelectedIndex(selectedIndex + IndexChange.Next);
        console.log(
          `selected: ${selectedIndex} which is: ${options[selectedIndex]}`,
        );
      }

      if (event.key === "ArrowUp" && selectedIndex > -1) {
        setSelectedIndex(selectedIndex + IndexChange.Previous);
      }

      if (event.key === "Enter") {
        console.log("Enter");
      }

      if (event.key === "Escape") {
        console.log("Escape");
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [options]);

  return (
    <div className={styles.autocomplete}>
      <InputText
        value={text}
        onChange={handleOnChange}
        placeholder={placeholder}
      />
      <ul className={styles.options}>
        {options.map((option, index) => {
          let selected = "";
          if (selectedIndex == index) {
            selected = "selected: ";
          }
          return (
            <li
              className={styles.option}
              key={option.value}
              onMouseDown={chooseThing(option)}
            >
              {`${selected}${option.label}`}
            </li>
          );
        })}
      </ul>
    </div>
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
