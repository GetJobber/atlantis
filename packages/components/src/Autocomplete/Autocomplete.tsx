import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import useEventListener from "@use-it/event-listener";
import styles from "./Autocomplete.css";
import { InputText, InputTextRef } from "../InputText";
import { Text } from "../Text";
import { Icon } from "../Icon";

type OptionValue = string | number;

interface Option {
  value: OptionValue;
  label: string;
}

interface AutocompleteProps {
  readonly initialOptions?: Option[];
  value: Option | undefined;
  onChange(newValue?: Option): void;
  getOptions(newValue: string): Promise<Option[]>;
  placeholder: string;
}

enum IndexChange {
  Previous = -1,
  Next = 1,
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
        activeOption={value}
        onOptionSelect={selectOption}
      />
    </div>
  );

  function selectOption(chosenOption: Option) {
    onSelectOption(chosenOption);
    textChange(chosenOption.label);
    setOptionsMenuVisible(false);
  }

  async function textChange(newValue: string) {
    setOptionsMenuVisible(true);
    setText(newValue);
    const results = await getOptions(newValue);
    setOptions(results);
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

interface MenuProps {
  visible: boolean;
  options: Option[];
  activeOption?: Option;
  onOptionSelect(chosenOption: Option): void;
}

function Menu({ visible, options, activeOption, onOptionSelect }: MenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const optionMenuClass = classnames(styles.options, {
    [styles.visible]: visible,
  });

  setupKeyListeners();

  useEffect(() => setSelectedIndex(-1), [options]);

  return (
    <div className={optionMenuClass}>
      {options.map((option, index) => {
        const optionClass = classnames(styles.option, {
          [styles.active]: index === selectedIndex,
        });
        return (
          <button
            className={optionClass}
            key={option.value}
            onMouseDown={handleMouseDown(option)}
          >
            <Text>
              {activeOption && option.value === activeOption.value && (
                <>
                  <Icon name="checkmark" size="small" />{" "}
                </>
              )}
              {option.label}
            </Text>
          </button>
        );
      })}
    </div>
  );

  function handleMouseDown(option: Option) {
    return () => {
      onOptionSelect(option);
    };
  }

  function setupKeyListeners() {
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

    // useOnKeyDown("Escape", () => inputRef.current.blur());
    useOnKeyDown("Enter", () => {
      onOptionSelect(options[selectedIndex]);
    });
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
