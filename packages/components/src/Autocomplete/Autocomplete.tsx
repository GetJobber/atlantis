import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import useEventListener from "@use-it/event-listener";
import styles from "./Autocomplete.css";
import { InputText, InputTextRef } from "../InputText";

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
  const ref = useRef() as MutableRefObject<InputTextRef>;

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
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [options, selectedIndex]);

  useOnKeyDown("Escape", () => ref.current.blur());
  useOnKeyDown("Enter", () => {
    selectOption(options[selectedIndex])();
    ref.current.blur();
  });

  return (
    <div className={styles.autocomplete}>
      <InputText
        value={text}
        onChange={handleOnChange}
        placeholder={placeholder}
        ref={ref}
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

// Split this out into a hooks package.
function useOnKeyDown(keyName: string, handler: () => void) {
  // Pending: https://github.com/donavon/use-event-listener/pull/12
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //@ts-ignore
  useEventListener<KeyboardEvent>("keydown", (event: KeyboardEvent) => {
    if (event.key === keyName) {
      handler();
    }
  });
}
