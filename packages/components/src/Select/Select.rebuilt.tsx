import React, { forwardRef, useId, useRef } from "react";
import omit from "lodash/omit";
import classnames from "classnames";
import type { SelectRebuiltProps } from "./Select.types";
import { useSelectActions } from "./hooks/useSelectActions";
import { useSelectFormField } from "./hooks/useSelectFormField";
import styles from "./Select.module.css";
import {
  FormFieldWrapper,
  useAtlantisFormFieldName,
  useFormFieldWrapperStyles,
} from "../FormField";
import { FormFieldPostFix } from "../FormField/FormFieldPostFix";
import { mergeRefs } from "../utils/mergeRefs";

export const SelectRebuilt = forwardRef<HTMLSelectElement, SelectRebuiltProps>(
  function SelectRebuilt(props, forwardedRef) {
    // Deprecated props
    const { inputRef: deprecatedInputRef } = props;

    const internalRef = useRef<HTMLSelectElement>(null);
    const mergedRef = mergeRefs<HTMLSelectElement>([
      internalRef,
      deprecatedInputRef as React.RefObject<HTMLSelectElement>,
      forwardedRef,
    ]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const { inputStyle } = useFormFieldWrapperStyles({
      ...omit(props, ["version"]),
    });

    const id = useSelectId(props);

    const { name } = useAtlantisFormFieldName({
      nameProp: props.name,
      id: id,
    });

    const { handleChange, handleBlur, handleFocus } = useSelectActions({
      onChange: props.onChange,
      onBlur: props.onBlur,
      onFocus: props.onFocus,
    });

    const inputProps = omit(props, [
      "onChange",
      "onBlur",
      "onFocus",
      "size",
      "placeholder",
      "version",
    ]);

    const { fieldProps, descriptionIdentifier } = useSelectFormField({
      ...inputProps,
      id,
      name,
      handleChange,
      handleBlur,
      handleFocus,
      autoFocus: props.autoFocus ?? props.autofocus,
      "aria-label": props["aria-label"],
      "aria-describedby": props["aria-describedby"],
      "aria-invalid": props["aria-invalid"],
      "aria-required": props["aria-required"],
    });

    return (
      <FormFieldWrapper
        disabled={props.disabled}
        size={props.size}
        align={props.align}
        inline={props.inline}
        autofocus={props.autoFocus ?? props.autofocus}
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
        maxLength={props.maxLength}
      >
        <>
          <select
            {...fieldProps}
            ref={mergedRef}
            className={classnames(
              inputStyle,
              props.UNSAFE_experimentalStyles && styles.select,
            )}
          >
            {props.children}
          </select>
          <FormFieldPostFix
            variation="select"
            className={styles.selectPostfix}
          />
        </>
      </FormFieldWrapper>
    );
  },
);

function useSelectId(props: SelectRebuiltProps) {
  const generatedId = useId();

  return props.id || generatedId;
}
