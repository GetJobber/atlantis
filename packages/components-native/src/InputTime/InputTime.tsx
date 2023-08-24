import React, { useMemo, useState } from "react";
import { FieldError, UseControllerProps } from "react-hook-form";
import { XOR } from "ts-xor";
import DateTimePicker from "react-native-modal-datetime-picker";
import { View } from "react-native";
import { utcToZonedTime } from "date-fns-tz";
import { format as formatTime } from "date-fns";
import { styles } from "./InputTime.style";
import { getTimeZoneOffsetInMinutes, roundUpToNearestMinutes } from "./utils";
import { useAtlantisContext } from "../AtlantisContext";
import { InputPressable } from "../InputPressable";
import { FormField } from "../FormField";
import { Clearable, InputFieldWrapperProps } from "../InputFieldWrapper";
import { useAtlantisI18n } from "../hooks/useAtlantisI18n";

interface InputTimeBaseProps
  extends Pick<InputFieldWrapperProps, "invalid" | "disabled" | "placeholder"> {
  /**
   * Defaulted to "always" so user can clear the time whenever there's a value.
   */
  readonly clearable?: Extract<Clearable, "always" | "never">;

  /**
   * Add a custom value to display when no time is selected
   * @default undefined
   */
  readonly emptyValueLabel?: string;

  /**
   * Adjusts the UX of the time picker based on where you'd use it.
   *
   * - `"granular"` - allows the user to pick a very specific time
   * - `"scheduling"` - only allows user to select between 5 minutes interval.
   *    If your design is catered towards "scheduling", you should use this type.
   *
   * @default scheduling
   */
  readonly type?: "granular" | "scheduling";

  /**
   * Hide or show the timer icon.
   */
  readonly showIcon?: boolean;
}

export interface InputTimeFormControlled extends InputTimeBaseProps {
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
   */
  readonly validations?: UseControllerProps["rules"];

  /**
   * The callback that fires whenever a time gets selected.
   */
  readonly onChange?: (value?: Date | null) => void;
}

interface InputTimeDevControlled extends InputTimeBaseProps {
  /**
   * The value shown on the field. This gets automatically formatted to the
   * account's time format.
   */
  readonly value: Date | string | undefined;

  /**
   * The callback that fires whenever a time gets selected.
   */
  readonly onChange: (value?: Date) => void;
}

export type InputTimeProps = XOR<
  InputTimeFormControlled,
  InputTimeDevControlled
>;

const LOCALE_24_HOURS = "en_GB";
const LOCALE_12_HOURS = "en_US";

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

export function InputTime(props: InputTimeProps): JSX.Element {
  if (props.name) {
    return (
      <FormField name={props.name} validations={props.validations}>
        {(field, error) => (
          <InternalInputTime
            {...props}
            value={field.value}
            onChange={(newValue?: Date | null) => {
              field.onChange(newValue);
              field.onBlur();
              props.onChange?.(newValue);
            }}
            invalid={formatInvalidState(error, props.invalid)}
          />
        )}
      </FormField>
    );
  }

  return <InternalInputTime {...props} />;
}

function InternalInputTime({
  clearable = "always",
  disabled,
  emptyValueLabel,
  invalid,
  placeholder,
  value,
  name,
  type = "scheduling",
  onChange,
  showIcon = true,
}: InputTimeProps): JSX.Element {
  const [showPicker, setShowPicker] = useState(false);
  const { t } = useAtlantisI18n();

  const { timeZone, timeFormat } = useAtlantisContext();
  const is24Hour = timeFormat === "HH:mm";

  const dateTime = useMemo(
    () => (typeof value === "string" ? new Date(value) : value),
    [value],
  );

  const formattedTime = useMemo(() => {
    if (dateTime) {
      const zonedTime = utcToZonedTime(dateTime, timeZone);
      return formatTime(zonedTime, timeFormat);
    }

    return emptyValueLabel;
  }, [dateTime, emptyValueLabel, timeZone, timeFormat]);

  const canClearTime = formattedTime === emptyValueLabel ? "never" : clearable;

  return (
    <View style={styles.container}>
      <InputPressable
        clearable={canClearTime}
        disabled={disabled}
        invalid={invalid}
        placeholder={placeholder ?? t("time")}
        prefix={showIcon ? { icon: "timer" } : undefined}
        value={formattedTime}
        onClear={handleClear}
        onPress={showDatePicker}
      />
      <DateTimePicker
        testID="inputTime-Picker"
        minuteInterval={getMinuteInterval(type)}
        date={getInitialPickerDate(dateTime)}
        timeZoneOffsetInMinutes={getTimeZoneOffsetInMinutes(timeZone, dateTime)}
        isVisible={showPicker}
        mode="time"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        is24Hour={is24Hour}
        locale={is24Hour ? LOCALE_24_HOURS : LOCALE_12_HOURS}
      />
    </View>
  );

  function showDatePicker() {
    setShowPicker(true);
  }

  function handleConfirm(newValue: Date) {
    setShowPicker(false);
    onChange?.(newValue);
  }

  function handleCancel() {
    setShowPicker(false);

    // Call onChange with the current value to trigger form's validation.
    onChange?.(dateTime);
  }

  function handleClear() {
    // Returns null only for Form controlled scenarios due to a limitation of
    // react-hook-form that doesn't allow passing undefined to form values.
    if (name) {
      onChange?.(null);
    } else {
      onChange?.(undefined);
    }
  }
}

function getInitialPickerDate(date?: Date | null): Date {
  if (date) return date;
  return roundUpToNearestMinutes(new Date(), 30);
}

function getMinuteInterval(type: InputTimeBaseProps["type"]) {
  if (type === "granular") return 1;
  return 5;
}
