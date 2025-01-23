import React, {
  Ref,
  RefAttributes,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Autocomplete.module.css";
import { Menu } from "./Menu/Menu";
import { AnyOption, AutocompleteProps, Option } from "./Autocomplete.types";
import { InputText, InputTextRef } from "../InputText";
import { useDebounce } from "../utils/useDebounce";

// Max statements increased to make room for the debounce functions
// eslint-disable-next-line max-statements
function AutocompleteInternal<
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
  GenericGetOptionsValue extends AnyOption = AnyOption,
>(
  {
    initialOptions = [],
    value,
    allowFreeForm = true,
    size = undefined,
    debounce: debounceRate = 300,
    onChange,
    getOptions,
    placeholder,
    onBlur,
    onFocus,
    validations,
    customMenuRender,
    ...inputProps
  }: AutocompleteProps<
    GenericOption,
    GenericOptionValue,
    GenericGetOptionsValue
  >,
  ref: Ref<InputTextRef>,
) {
  const [options, setOptions] = useState<
    Array<GenericOption | GenericGetOptionsValue>
  >(mapToOptions(initialOptions));
  const [menuVisible, setMenuVisible] = useState(false);
  const [inputText, setInputText] = useState(value?.label ?? "");
  const autocompleteRef = useRef(null);
  const delayedSearch = useDebounce(updateSearch, debounceRate);

  useEffect(() => {
    delayedSearch();
  }, [inputText]);

  useEffect(() => {
    updateInput(value?.label ?? "");
  }, [value]);

  return (
    <div className={styles.autocomplete} ref={autocompleteRef}>
      <InputText
        ref={ref}
        autocomplete={false}
        size={size}
        value={inputText}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        validations={validations}
        {...inputProps}
      />
      <Menu
        attachTo={autocompleteRef}
        visible={menuVisible && options.length > 0}
        options={options}
        customMenuRender={customMenuRender}
        selectedOption={value}
        onOptionSelect={handleMenuChange}
      />
    </div>
  );

  function updateInput(newText: string) {
    setInputText(newText);

    if (newText === "") {
      setOptions(mapToOptions(initialOptions));
    }
  }

  async function updateSearch() {
    const updatedOptions = await getOptions(inputText);
    const filteredOptions = updatedOptions.filter(option =>
      "options" in option && option.options ? option.options.length > 0 : true,
    );

    setOptions(mapToOptions(filteredOptions));
  }

  function handleMenuChange(chosenOption: GenericOptionValue) {
    onChange(chosenOption);
    updateInput(chosenOption.label ?? "");
    setMenuVisible(false);
  }

  function handleInputChange(newText: string) {
    updateInput(newText);

    if (allowFreeForm) {
      onChange({ label: newText } as GenericOptionValue);
    }
  }

  function handleInputBlur() {
    setMenuVisible(false);

    if (value == undefined || value.label !== inputText) {
      setInputText("");
      onChange(undefined);
    }
    onBlur && onBlur();
  }

  function handleInputFocus() {
    setMenuVisible(true);

    if (onFocus) {
      onFocus();
    }
  }
}

function mapToOptions<GenericOption extends AnyOption = AnyOption>(
  items: GenericOption[],
) {
  const retVal = items.reduce<GenericOption[]>((result, item) => {
    result.push(item);

    if ("options" in item && item.options) {
      result = result.concat(item.options as GenericOption[]);
    }

    return result;
  }, []);

  return retVal;
}

// Casts the Generics to the forward ref so autocomplete works as expected for consumers
export const Autocomplete = forwardRef(AutocompleteInternal) as <
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
  GenericGetOptionsValue extends AnyOption = AnyOption,
>(
  props: AutocompleteProps<
    GenericOption,
    GenericOptionValue,
    GenericGetOptionsValue
  > &
    RefAttributes<InputTextRef>,
) => ReturnType<typeof AutocompleteInternal>;
