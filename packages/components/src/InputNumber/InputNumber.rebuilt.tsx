import type { FocusEvent } from "react";
import React, { createRef, forwardRef, useImperativeHandle } from "react";
import {
  FieldError as AriaFieldError,
  NumberField as AriaNumberField,
  Text as AriaText,
  Group,
  Input,
  Label,
} from "react-aria-components";
import classnames from "classnames";
import styles from "./InputNumber.rebuilt.module.css";
import { InputNumberRebuiltProps } from "./InputNumber.rebuilt.types";
import { Icon } from "../Icon";
import { Text } from "../Text";

const defaultFormatOptions: Intl.NumberFormatOptions = {
  notation: "standard",
  style: "decimal",
};

export interface InputNumberRebuiltRef {
  blur(): void;
  focus(): void;
}

export const InputNumberRebuilt = forwardRef(
  (props: InputNumberRebuiltProps, ref: React.Ref<InputNumberRebuiltRef>) => {
    const inputRef = createRef<HTMLInputElement>();

    const mergedFormatOptions = {
      ...defaultFormatOptions,
      ...props.formatOptions,
    };

    function handleChange(
      newValue: number,
      event?: React.ChangeEvent<HTMLInputElement>,
    ) {
      props.onChange && props.onChange(newValue, event);
    }

    function getValidationError(value: number | undefined): string | undefined {
      if (value === undefined || value === null) {
        return undefined;
      }

      const isOverMax = props.maxValue !== undefined && value > props.maxValue;
      const isUnderMin = props.minValue !== undefined && value < props.minValue;

      if (isOverMax || isUnderMin) {
        if (props.minValue !== undefined && props.maxValue === undefined) {
          return `Enter a number that is greater than or equal to ${props.minValue}`;
        } else if (
          props.maxValue !== undefined &&
          props.minValue === undefined
        ) {
          return `Enter a number that is less than or equal to ${props.maxValue}`;
        } else if (
          props.minValue !== undefined &&
          props.maxValue !== undefined
        ) {
          return `Enter a number between ${props.minValue} and ${props.maxValue}`;
        }
      }

      return undefined;
    }

    useImperativeHandle(ref, () => ({
      blur: () => {
        const input = inputRef.current;

        if (input) {
          input.blur();
        }
      },
      focus: () => {
        const input = inputRef.current;

        if (input) {
          input.focus();
        }
      },
    }));

    const {
      align,
      description,
      disabled,
      error,
      inline,
      invalid,
      placeholder,
      readonly,
      showMiniLabel = true,
      size,
      minValue,
      maxValue,
      ...ariaNumberFieldProps
    } = props;

    // Determine if the field should be invalid based on min/max validation
    const validationError = getValidationError(props.value);
    const isInvalid = invalid || !!validationError;
    const displayError = error || validationError;

    return (
      <AriaNumberField
        {...ariaNumberFieldProps}
        className={classnames(styles.container, inline && styles.inline)}
        formatOptions={mergedFormatOptions}
        isDisabled={disabled}
        isInvalid={isInvalid}
        isReadOnly={readonly}
        minValue={minValue}
        maxValue={maxValue}
        onBlur={e => props.onBlur?.(e as FocusEvent<HTMLInputElement>)}
        onFocus={e => props.onFocus?.(e as FocusEvent<HTMLInputElement>)}
        onChange={handleChange}
      >
        <Group
          className={classnames(
            styles.wrapper,
            align && styles[align],
            isInvalid && styles.invalid,
            disabled && styles.disabled,
          )}
        >
          <div className={styles.horizontalWrapper}>
            <div
              className={classnames(
                styles.inputWrapper,
                disabled && styles.disabled,
                !showMiniLabel && styles.hideLabel,
                size && styles[size],
              )}
            >
              <Input
                className={styles.input}
                placeholder=" " // used for CSS minilabel
                ref={inputRef}
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
        {displayError && (
          <AriaFieldError className={styles.fieldError}>
            <Icon color="critical" name="alert" size="small" />
            <Text size="small" variation="error">
              {displayError}
            </Text>
          </AriaFieldError>
        )}
      </AriaNumberField>
    );
  },
);
InputNumberRebuilt.displayName = "InputNumberRebuilt";
