import React, { useId, useRef } from "react";
import omit from "lodash/omit";
import classnames from "classnames";
import type { SelectRebuiltProps } from "./Select.types";
import { useSelectActions } from "./hooks/useSelectActions";
import styles from "./Select.module.css";
import {
  FormFieldWrapper,
  useAtlantisFormFieldName,
  useFormFieldWrapperStyles,
} from "../FormField";
import { FormFieldPostFix } from "../FormField/FormFieldPostFix";
import { mergeRefs } from "../utils/mergeRefs";

export function SelectRebuilt(props: SelectRebuiltProps) {
  const { inputRef } = props;

  const internalRef = useRef<HTMLSelectElement>(null);
  const mergedRef = mergeRefs<HTMLSelectElement>([
    internalRef,
    inputRef as React.RefObject<HTMLSelectElement>,
  ]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { inputStyle } = useFormFieldWrapperStyles({
    ...omit(props, ["version"]),
  });

  const id = props.id || useId();
  const descriptionIdentifier = `descriptionUUID--${id}`;

  const { name } = useAtlantisFormFieldName({
    nameProp: props.name,
    id: id,
  });

  const { handleChange, handleBlur, handleFocus } = useSelectActions({
    onChange: props.onChange,
    onBlur: props.onBlur,
    onFocus: props.onFocus,
  });

  const descriptionVisible = props.description && !props.inline;
  const isInvalid = Boolean(props.error || props.invalid);

  return (
    <FormFieldWrapper
      disabled={props.disabled}
      size={props.size}
      align={props.align}
      inline={props.inline}
      name={name}
      wrapperRef={wrapperRef}
      error={props.error ?? ""}
      invalid={props.invalid}
      identifier={id}
      descriptionIdentifier={descriptionIdentifier}
      description={props.description}
      type="select"
      placeholder={props.placeholder}
      value={props.value}
      prefix={props.prefix}
      suffix={props.suffix}
      clearable="never"
    >
      <>
        <select
          id={id}
          name={name}
          disabled={props.disabled}
          autoFocus={props.autoFocus}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={props.value}
          aria-label={props["aria-label"]}
          aria-describedby={
            descriptionVisible
              ? descriptionIdentifier
              : props["aria-describedby"]
          }
          aria-invalid={isInvalid ? true : undefined}
          aria-required={props["aria-required"]}
          ref={mergedRef}
          className={classnames(
            inputStyle,
            props.UNSAFE_experimentalStyles && styles.select,
          )}
        >
          {props.children}
        </select>
        <FormFieldPostFix variation="select" className={styles.selectPostfix} />
      </>
    </FormFieldWrapper>
  );
}
