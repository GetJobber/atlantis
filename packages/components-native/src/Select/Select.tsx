import React, { ReactElement } from "react";
import { View } from "react-native";
import { RegisterOptions } from "react-hook-form";
import { styles } from "./Select.style";
import { SelectInternalPicker } from "./components/SelectInternalPicker";
import { InputFieldWrapper } from "../InputFieldWrapper";
import { Icon } from "../Icon";
import { TextVariation } from "../Typography";
import { Text } from "../Text";
import { useFormController } from "../hooks";
import { useAtlantisI18n } from "../hooks/useAtlantisI18n";

export interface SelectOption {
  /**
   * Text that shows up as the option
   */
  readonly children: string;

  /**
   * The value that gets returned when an option is selected
   */
  readonly value: string;
}

export interface SelectProps {
  /**
   * Current value of the component
   */
  readonly value?: string;

  /**
   * Default value for when the component is uncontrolled
   */
  readonly defaultValue?: string;

  /**
   * Adds a first option to let users select a "no value".
   * Placeholder item selected by default until a selection is made.
   */
  readonly placeholder?: string;

  /**
   * Label text shown above the selection.
   */
  readonly label?: string;

  /**
   * Help text shown below the control.
   */
  readonly assistiveText?: string;

  /**
   * Callback that provides the new value when the selection changes
   */
  readonly onChange?: (newValue?: string) => void;

  /**
   * Disables input selection
   */
  readonly disabled?: boolean;

  /**
   * Indicates the current selection is invalid
   */
  readonly invalid?: boolean;

  /**
   * VoiceOver will read this string when a user selects the element
   */
  readonly accessibilityLabel?: string;

  /**
   * Helps users understand what will happen when they perform an action
   */
  readonly accessibilityHint?: string;

  /**
   * Name of the input.
   */
  readonly name?: string;

  /**
   * The options to select from
   */
  readonly children: ReactElement<SelectOption>[];

  /**
   * The validations that will mark this component as invalid
   */
  readonly validations?: RegisterOptions;

  /**
   * Used to locate this view in end-to-end tests.
   */
  readonly testID?: string;
}

export function Select({
  value,
  defaultValue,
  onChange,
  children,
  placeholder,
  label,
  assistiveText,
  disabled,
  invalid,
  validations,
  accessibilityLabel,
  name,
  testID,
}: SelectProps): JSX.Element {
  const { field, error } = useFormController({
    name,
    validations,
    value: value ?? defaultValue,
  });

  const { t } = useAtlantisI18n();
  const internalValue = value ?? field.value;
  const textVariation = getTextVariation({
    disabled,
    invalid: invalid || !!error,
  });
  const valueTextVariation = disabled ? "disabled" : undefined;
  const hasValue = internalValue && internalValue?.length > 0;

  return (
    <InputFieldWrapper
      error={error}
      invalid={invalid || !!error}
      hasValue={hasValue}
      styleOverride={{
        container: { borderBottomWidth: undefined },
      }}
    >
      <View
        testID={getTestID(testID)}
        accessible={true}
        accessibilityLabel={getA11yLabel()}
        accessibilityValue={{ text: getValue() }}
        accessibilityHint={t("Select.a11yHint")}
        accessibilityRole="button"
        accessibilityState={{ disabled: disabled }}
      >
        <SelectInternalPicker
          disabled={disabled}
          options={getOptions()}
          onChange={handleChange}
        >
          <View
            style={[styles.container, (invalid || !!error) && styles.invalid]}
          >
            {label && (
              <Text
                level="textSupporting"
                variation={textVariation}
                hideFromScreenReader={true}
              >
                {label}
              </Text>
            )}

            <View style={styles.input}>
              <View style={styles.value}>
                <Text
                  variation={disabled ? "disabled" : "base"}
                  hideFromScreenReader={true}
                >
                  {getValue()}
                </Text>
              </View>
              <View style={styles.icon}>
                <Icon name="arrowDown" color={valueTextVariation} />
              </View>
            </View>
          </View>
        </SelectInternalPicker>

        {assistiveText && (
          <Text
            level="textSupporting"
            variation={textVariation}
            hideFromScreenReader={true}
          >
            {assistiveText}
          </Text>
        )}
      </View>
    </InputFieldWrapper>
  );

  function getA11yLabel(): string | undefined {
    let text = [accessibilityLabel || label, assistiveText];
    text = text.filter(Boolean);

    return text.join(", ");
  }

  function handleChange(val: string) {
    onChange?.(val);
    // need this onBlur for validations to occur
    field.onBlur();
    field.onChange(val);
  }

  function getOptions() {
    const options = children.map(({ props }) => ({
      label: props.children,
      value: props.value,
      isActive: props.value === internalValue,
    }));

    if (!internalValue || placeholder) {
      options.unshift({
        label: placeholder || t("Select.emptyValue"),
        value: "",
        isActive: !internalValue,
      });
    }

    return options;
  }

  function getValue() {
    const options = getOptions();

    const activeValue = options.find(option => option.isActive);

    return activeValue?.label || placeholder || t("Select.emptyValue");
  }
}

function getTextVariation({
  invalid,
  disabled,
}: Pick<SelectProps, "invalid" | "disabled">): TextVariation {
  if (invalid) return "error";
  if (disabled) return "disabled";

  return "subdued";
}

function getTestID(testID?: string): string {
  if (testID) {
    return `ATL-${testID}-Select`;
  }

  return "ATL-Select";
}

export function Option({ children }: SelectOption): JSX.Element {
  return <>{children}</>;
}
