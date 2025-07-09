import React, {
  Ref,
  RefAttributes,
  RefObject,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./Autocomplete.module.css";
import { Menu } from "./Menu/Menu";
import { AnyOption, AutocompleteProps, Option } from "./Autocomplete.types";
import { isOptionGroup } from "./Autocomplete.utils";
import { InputText, InputTextRef } from "../InputText";
import { mergeRefs } from "../utils/mergeRefs";
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
    updateOptions,
    validations,
    customRenderMenu,
    version,
    ...inputProps
  }: AutocompleteProps<
    GenericOption,
    GenericOptionValue,
    GenericGetOptionsValue
  >,
  ref: Ref<InputTextRef>,
) {
  const initialOptionsMemo = useMemo(
    () => mapToOptions(initialOptions),
    [initialOptions],
  );
  const [options, setOptions] =
    useState<Array<GenericOption | GenericGetOptionsValue>>(initialOptionsMemo);
  const [inputFocused, setInputFocused] = useState(false);
  const [inputText, setInputText] = useState(value?.label ?? "");
  const autocompleteRef = useRef(null);
  const delayedSearch = useDebounce(updateSearch, debounceRate);
  const inputRef = useRef<InputTextRef | null>(null);

  useEffect(() => {
    delayedSearch();
  }, [inputText]);

  useEffect(() => {
    updateInput(value?.label ?? "");
  }, [value]);

  return (
    <div className={styles.autocomplete} ref={autocompleteRef}>
      <InputText
        ref={mergeRefs([ref, inputRef])}
        autocomplete={false}
        size={size}
        value={inputText}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={handleInputFocus}
        version={version as 1}
        onBlur={handleInputBlur}
        validations={validations}
        {...inputProps}
      />
      <Menu
        attachTo={autocompleteRef}
        inputRef={inputRef}
        inputFocused={inputFocused}
        options={options as (GenericOption | GenericGetOptionsValue)[]}
        customRenderMenu={customRenderMenu}
        selectedOption={value}
        onOptionSelect={handleMenuChange}
        handleUpdateOptions={handleUpdateOptions}
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
      isOptionGroup(option) ? option.options.length > 0 : true,
    );

    setOptions(mapToOptions(filteredOptions));
  }

  function handleMenuChange(chosenOption?: GenericOptionValue) {
    onChange(chosenOption);
    updateInput(chosenOption?.label ?? "");
    setInputFocused(false);
  }

  async function handleUpdateOptions(query: object | string) {
    if (updateOptions) {
      const updatedOptions = await updateOptions(query);

      setOptions(mapToOptions(updatedOptions));
    }
  }

  function handleInputChange(newText: string) {
    updateInput(newText);

    if (allowFreeForm) {
      onChange({ label: newText } as GenericOptionValue);
    }
  }

  function handleInputBlur() {
    setInputFocused(false);

    if (value == undefined || value.label !== inputText) {
      setInputText("");
      onChange(undefined);
    }
    onBlur && onBlur();
  }

  function handleInputFocus() {
    setInputFocused(true);

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

    if (isOptionGroup(item) && item.options) {
      result = result.concat(item.options as GenericOption[]);
    }

    return result;
  }, []);

  return retVal;
}

export function AutocompleteWrapper({
  children,
  autocompleteRef,
}: {
  readonly children: React.ReactNode;
  readonly autocompleteRef: RefObject<HTMLDivElement>;
}) {
  return (
    <div className={styles.autocomplete} ref={autocompleteRef}>
      {children}
    </div>
  );
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
