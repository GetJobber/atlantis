import type { FocusEvent } from "react";
import React from "react";
import {
  NumberField as AriaNumberField,
  Text as AriaText,
  Group,
  Input,
  Label,
} from "react-aria-components";
import classnames from "classnames";
import styles from "./InputCurrency.module.css";
import { Icon } from "../Icon";
import { Text } from "../Text";

/**
 * Experimental and temporary version of the InputCurrency component.
 * Do not modify this code unless you have talked with UXF first.
 */

export interface InputCurrencyProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    | "onChange"
    | "onFocus"
    | "onBlur"
    | "size"
    | "step"
    | "value"
    | "max"
    | "min"
    | "defaultValue"
  > {
  readonly align?: "center" | "right";
  readonly autocomplete?: boolean | string;
  readonly autoFocus?: boolean;

  readonly defaultValue?: number;
  readonly description?: string;
  readonly error?: string;
  readonly formatOptions?: Intl.NumberFormatOptions;
  readonly inline?: boolean;
  readonly invalid?: boolean;
  readonly onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  readonly onChange?: (newValue: number) => void;
  readonly onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  readonly readOnly?: boolean;
  readonly showMiniLabel?: boolean;

  readonly size?: "small" | "large";
  readonly value?: number;
}

const defaultFormatOptions: Intl.NumberFormatOptions = {
  currency: "USD",
  currencyDisplay: "symbol",
  style: "currency",
};

export const InputCurrency = React.forwardRef<
  HTMLInputElement,
  InputCurrencyProps
>((props, forwardedRef) => {
  const {
    align,
    description,
    disabled,
    error,
    formatOptions = defaultFormatOptions,
    inline,
    invalid,
    placeholder,
    readOnly,
    showMiniLabel = true,
    size,
    ...ariaNumberFieldProps
  } = props;

  return (
    <AriaNumberField
      {...ariaNumberFieldProps}
      className={classnames(styles.container, inline && styles.inline)}
      formatOptions={formatOptions}
      isDisabled={disabled}
      isInvalid={invalid}
      isReadOnly={readOnly}
      onBlur={e => props.onBlur?.(e as FocusEvent<HTMLInputElement>)}
      onFocus={e => props.onFocus?.(e as FocusEvent<HTMLInputElement>)}
    >
      <Group
        className={classnames(
          styles.wrapper,
          align && styles[align],
          invalid && styles.invalid,
          disabled && styles.disabled,
        )}
      >
        <div className={styles.horizontalWrapper}>
          <div
            className={classnames(
              styles.inputWrapper,
              !showMiniLabel && styles.hideLabel,
              size && styles[size],
            )}
          >
            <Input
              className={styles.input}
              placeholder=" " // used for CSS minilabel
              ref={forwardedRef}
            />
            <Label className={styles.label}>{placeholder}</Label>
          </div>
        </div>
      </Group>
      {description && (
        <AriaText
          className={styles.description}
          elementType="div"
          slot="description"
        >
          <Text size="small" variation="subdued">
            {description}
          </Text>
        </AriaText>
      )}
      {error && (
        <AriaText
          className={styles.fieldError}
          elementType="div"
          slot="errorMessage"
        >
          <Icon color="critical" name="alert" size="small" />
          <Text size="small" variation="error">
            {error}
          </Text>
        </AriaText>
      )}
    </AriaNumberField>
  );
});

InputCurrency.displayName = "InputCurrency";
