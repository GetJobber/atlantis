import React, { useMemo, useState } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Platform } from "react-native";
import { FieldError, UseControllerProps } from "react-hook-form";
import { XOR } from "ts-xor";
import { useIntl } from "react-intl";
import { messages } from "./messages";
import { useFormattedDate } from "../hooks/useFormattedDate";
import { Clearable, InputFieldWrapperProps } from "../InputFieldWrapper";
import { FormField } from "../FormField";
import { InputPressable } from "../InputPressable";

interface BaseInputDateProps
  extends Pick<InputFieldWrapperProps, "invalid" | "disabled" | "placeholder"> {
  /**
   * Defaulted to "always" so user can clear the dates whenever there's a value.
   */
  readonly clearable?: Extract<Clearable, "always" | "never">;

  /**
   * This label is shown to the user when there's no selected date.
   */
  readonly emptyValueLabel?: string;

  /**
   * Maximum date the user can set.
   */
  readonly maxDate?: Date;

  /**
   * Minimum date the user can set
   */
  readonly minDate?: Date;

  /**
   * VoiceOver will read this string when a user selects the element
   */
  readonly accessibilityLabel?: string;

  /**
   * Helps users understand what will happen when they perform an action
   */
  readonly accessibilityHint?: string;
}

interface FormControlledInputDate extends BaseInputDateProps {
  /**
   * Adding a `name` would make this component "Form controlled" and must be
   * nested within a `<Form />` component.
   *
   * Cannot be declared if `value` prop is used.
   */
  readonly name: string;

  /**
   * Shows an error message below the field and highlights it red when the
   * value is invalid. Only applies when nested within a `<Form />` component.
   *
   * You can see **most** of the rules you can pass in
   * [React-hook-form Documentation](https://react-hook-form.com/api/useform/register#options).
   */
  readonly validations?: UseControllerProps["rules"];

  /**
   * The initial value for the input.
   */
  readonly defaultValue?: Date;

  /**
   * The callback that fires whenever a date gets selected.
   */
  readonly onChange?: (value?: Date | null) => void;
}

interface DevControlledInputDate extends BaseInputDateProps {
  /**
   * The value shown on the field. This gets automatically formatted to the
   * account's date format.
   *
   * Cannot be declared if `name` prop is used.
   */
  readonly value: Date | string | undefined;

  /**
   * The callback that fires whenever a date gets selected.
   */
  readonly onChange: (value?: Date) => void;
}

type InputDateProps = XOR<FormControlledInputDate, DevControlledInputDate>;

function formatInvalidState(
  error: FieldError | undefined,
  invalid: InputFieldWrapperProps["invalid"],
): boolean | string {
  if (invalid) return invalid;

  if (error && error.message) {
    return error.message;
  }

  return Boolean(error);
}

const display = Platform.OS === "ios" ? "inline" : "default";

/**
 * Allow users to select a date using the device date picker.
 */
export function InputDate(props: InputDateProps): JSX.Element {
  if (props.name) {
    return (
      <FormField<Date>
        name={props.name}
        defaultValue={props.defaultValue}
        validations={props.validations}
      >
        {({ value, onChange, onBlur }, error) => (
          <InternalInputDate
            {...props}
            value={value}
            onChange={(newValue?: Date | null) => {
              onChange(newValue);
              onBlur();
              props.onChange?.(newValue);
            }}
            invalid={formatInvalidState(error, props.invalid)}
          />
        )}
      </FormField>
    );
  }

  return <InternalInputDate {...props} />;
}

function InternalInputDate({
  clearable = "always",
  disabled,
  emptyValueLabel,
  invalid,
  maxDate,
  minDate,
  placeholder,
  value,
  name,
  onChange,
  accessibilityLabel,
  accessibilityHint,
}: InputDateProps): JSX.Element {
  const [showPicker, setShowPicker] = useState(false);
  const formatDate = useFormattedDate();
  const { formatMessage } = useIntl();

  const date = useMemo(() => {
    if (typeof value === "string") return new Date(value);
    return value;
  }, [value]);

  const formattedDate = useMemo(
    () => (date && formatDate(date, "accountFormat")) ?? emptyValueLabel,
    [date, emptyValueLabel, formatDate],
  );

  const canClearDate = formattedDate === emptyValueLabel ? "never" : clearable;

  const placeholderLabel =
    placeholder ?? formatMessage(messages.datePlaceholder);

  return (
    <>
      <InputPressable
        clearable={canClearDate}
        disabled={disabled}
        invalid={invalid}
        placeholder={placeholderLabel}
        prefix={{ icon: "calendar" }}
        value={formattedDate}
        onClear={handleClear}
        onPress={showDatePicker}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
      />
      <DateTimePicker
        testID="inputDate-datePicker"
        date={date || undefined}
        display={display}
        isVisible={showPicker}
        maximumDate={maxDate}
        minimumDate={minDate}
        mode="date"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );

  function showDatePicker() {
    setShowPicker(true);
  }

  function handleConfirm(newVal: Date) {
    setShowPicker(false);
    onChange?.(newVal);
  }

  function handleCancel() {
    setShowPicker(false);

    // Ensure a change happens so we trigger the validation of one exists
    onChange?.(date);
  }

  function handleClear() {
    // Returns null only for Form controlled scenarios due to a limitation of react-hook-form that doesn't allow passing undefined to form values.
    if (name) {
      onChange?.(null);
    } else {
      onChange?.(undefined);
    }
  }
}
