import React from "react";
import {
  NumberField as AriaNumberField,
  // NumberFieldProps as AriaNumberFieldProps,
  // FieldError,
  // Group,
  Input,
  // Label,
  // Text,
  // ValidationResult,
} from "react-aria-components";
// import classnames from "classnames";
import { InputNumberRebuiltProps } from "./InputNumber2.types";
import styles from "../FormField/FormField.module.css";
// import { useIsSafari } from "../FormField/hooks/useIsSafari";
// import {
//   LabelPadding,
//   useFormFieldWrapperStylesProps,
// } from "../FormField/hooks/useFormFieldWrapperStyles";

export function InputNumber2(props: InputNumberRebuiltProps) {
  const ariaNumberFieldProps = {
    ...props,
  };

  return (
    <div className={styles.container}>
      <AriaNumberField {...ariaNumberFieldProps} className={styles.wrapper}>
        {/* <Label>{placeholder}</Label> */}
        {/* <Group> */}
        <Input className={styles.input} />
        {/* <Button slot="decrement">-</Button> */}
        {/* <Button slot="increment">+</Button> */}
        {/* </Group> */}
        {/* {description && <Text slot="description">{description}</Text>} */}
        {/* <FieldError>{error}</FieldError> */}
      </AriaNumberField>
    </div>
  );
}
