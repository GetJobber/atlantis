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
import type { InputNumberRebuiltProps } from "./InputNumber.rebuilt.types";
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
      readOnly,
      showMiniLabel = true,
      size,
      minValue,
      maxValue,
      dataAttributes,
      ...ariaNumberFieldProps
    } = props;

    const stringDescription = typeof description === "string";

    return (
      <AriaNumberField
        {...ariaNumberFieldProps}
        className={classnames(styles.container, inline && styles.inline)}
        formatOptions={mergedFormatOptions}
        id={props.id}
        isDisabled={disabled}
        isInvalid={invalid}
        isReadOnly={readOnly}
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
            invalid && styles.invalid,
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
                {...dataAttributes}
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
            {stringDescription ? (
              <Text size="small" variation="subdued">
                {description}
              </Text>
            ) : (
              description
            )}
          </AriaText>
        )}
        {error && (
          <AriaFieldError className={styles.fieldError}>
            <Icon color="critical" name="alert" size="small" />
            <Text size="small" variation="error">
              {error}
            </Text>
          </AriaFieldError>
        )}
      </AriaNumberField>
    );
  },
);
InputNumberRebuilt.displayName = "InputNumberRebuilt";
