import React, { Ref, forwardRef, useEffect } from "react";
import { View } from "react-native";
import debounce from "lodash/debounce";
import { styles } from "./InputSearch.style";
import { InputText, InputTextProps, InputTextRef } from "../InputText";

export const InputSearch = forwardRef(SearchInputInternal);

export interface InputSearchProps
  extends Pick<
    InputTextProps,
    | "accessibilityHint"
    | "accessibilityLabel"
    | "autoFocus"
    | "placeholder"
    | "prefix"
  > {
  /**
   * A callback function that handles the update of the new value of the property value.
   */
  readonly onChange: (newValue: string) => void;

  /**
   * A callback function that handles the API call to search the value. This is where the
   * wait value is applied to the debounce function to give a delay in each input and API request.
   */
  readonly onDebouncedChange: (searchValue: string) => void;

  /**
   * Set the component to a given value
   */
  readonly value: string;

  /**
   * A numeric value to represents the milliseconds in delaying the function to populate
   * the data source when the 'value' changed.
   * @default 300
   */
  readonly wait?: number;
}

function SearchInputInternal(
  {
    onChange,
    onDebouncedChange,
    wait = 300,
    value,
    ...inputTextProps
  }: InputSearchProps,
  ref: Ref<InputTextRef>,
) {
  const delayedSearch = debounce(() => onDebouncedChange(value), wait);
  const handleChange = (newValue = "") => onChange(newValue);

  useEffect(() => {
    delayedSearch();
    return delayedSearch.cancel;
  }, [value, delayedSearch]);

  return (
    <View style={styles.container}>
      <InputText
        {...inputTextProps}
        autoCorrect={false}
        onChangeText={handleChange}
        ref={ref}
        value={value}
      />
    </View>
  );
}
