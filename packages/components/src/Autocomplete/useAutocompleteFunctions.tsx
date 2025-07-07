import { FocusEvent, useMemo, useState } from "react";
import { isOptionGroup } from "./Autocomplete.utils";
import { AnyOption, Option } from "./Autocomplete.types";

// eslint-disable-next-line max-statements
export function useAutocompleteFunctions({
  getOptions,
  onChange,
  onBlur,
  onFocus,
  value,
  allowFreeForm,
  initialOptions,
  updateOptions,
}: {
  getOptions: (
    newInputText: string,
  ) => (AnyOption | AnyOption)[] | Promise<(AnyOption | AnyOption)[]>;
  updateOptions?: (
    newInputText: string | object,
  ) => (AnyOption | AnyOption)[] | Promise<(AnyOption | AnyOption)[]>;

  onChange: (newValue?: Option | undefined) => void;
  onBlur:
    | ((event?: FocusEvent<Element, Element> | undefined) => void)
    | undefined;
  onFocus:
    | ((event?: FocusEvent<Element, Element> | undefined) => void)
    | undefined;
  value: Option | undefined;
  allowFreeForm: boolean;
  initialOptions: AnyOption[];
}) {
  const initialOptionsMemo = useMemo(
    () => mapToOptions(initialOptions),
    [initialOptions],
  );
  const [inputFocused, setInputFocused] = useState(false);
  const [inputText, setInputText] = useState(value?.label ?? "");
  const [options, setOptions] =
    useState<Array<AnyOption | AnyOption>>(initialOptionsMemo);

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

  async function handleUpdateOptions(query: object | string) {
    if (updateOptions) {
      const updatedOptions = await updateOptions(query);

      setOptions(mapToOptions(updatedOptions));
    }
  }

  function handleMenuChange(
    chosenOption?: Option,
    { onlyChange }: { onlyChange?: boolean } = {},
  ) {
    if (onlyChange) {
      onChange(chosenOption);
    } else {
      onChange(chosenOption);
      updateInput(chosenOption?.label ?? "");
      setInputFocused(false);
    }
  }

  function handleInputChange(newText: string) {
    updateInput(newText);

    if (allowFreeForm) {
      onChange({ label: newText } as Option);
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

  return {
    handleInputFocus,
    handleInputBlur,
    handleInputChange,
    handleMenuChange,
    handleUpdateOptions,
    updateSearch,
    inputFocused,
    inputText,
    updateInput,
    options,
  };
}
