import React, { useEffect, useState } from "react";
import classnames from "classnames";
import styles from "./Autocomplete.css";
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
      }

      if (event.key === "ArrowUp" && selectedIndex > -1) {
        setSelectedIndex(selectedIndex + IndexChange.Previous);
      }

      if (event.key === "Enter") {
        selectOption(options[selectedIndex])();
      }

      if (event.key === "Escape") {
        console.log("Escape");
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [options, selectedIndex]);

  return (
    <div className={styles.autocomplete}>
      <InputText
        value={text}
        onChange={handleOnChange}
        placeholder={placeholder}
      />
      <ul className={styles.options}>
        {options.map((option, index) => {
          const optionClass = classnames(styles.option, {
            [styles.active]: index === selectedIndex,
          });
          return (
            <li
              className={optionClass}
              key={option.value}
              onMouseDown={selectOption(option)}
            >
              {option.label}
            </li>
          );
        })}
      </ul>
    </div>
  );

  function selectOption(choosenOption: Option) {
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
