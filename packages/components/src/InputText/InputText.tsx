import React, { Ref, forwardRef, useImperativeHandle, useRef } from "react";
import { XOR } from "ts-xor";
import { useSafeLayoutEffect } from "@jobber/hooks/useSafeLayoutEffect";
import { RowRange } from "./InputText.types";
import { useTextAreaResize } from "./useTextAreaResize";
import {
  CommonFormFieldProps,
  FieldActionsRef,
  FormField,
  FormFieldProps,
} from "../FormField";

interface BaseProps
  extends CommonFormFieldProps,
    Pick<
      FormFieldProps,
      | "autofocus"
      | "maxLength"
      | "readonly"
      | "autocomplete"
      | "keyboard"
      | "onEnter"
      | "onFocus"
      | "onBlur"
      | "onChange"
      | "inputRef"
      | "validations"
      | "defaultValue"
      | "prefix"
      | "suffix"
      | "toolbar"
      | "toolbarVisibility"
    > {
  multiline?: boolean;
}

export interface InputTextRef {
  insert(text: string): void;
  blur(): void;
  focus(): void;
  scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
}

interface MultilineProps extends BaseProps {
  /**
   * Use this when you're expecting a long answer.
   */
  readonly multiline: true;

  /**
   * Specifies the visible height of a long answer form field. Can be in the
   * form of a single number to set a static height, or an object with a min
   * and max keys indicating the minimum number of visible rows, and the
   * maximum number of visible rows.
   */
  readonly rows?: number | RowRange;
}

export type InputTextPropOptions = XOR<BaseProps, MultilineProps>;

function InputTextInternal(
  props: InputTextPropOptions,
  ref: Ref<InputTextRef>,
) {
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  const actionsRef = useRef<FieldActionsRef>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { resize, rowRange } = useTextAreaResize(props.rows);

  useImperativeHandle(ref, () => ({
    insert: (text: string) => {
      insertText(text);
    },
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
    scrollIntoView: arg => {
      const input = inputRef.current;

      if (input) {
        input.scrollIntoView(arg);
      }
    },
  }));

  useSafeLayoutEffect(() => {
    resize(inputRef, wrapperRef);
  }, [inputRef.current, wrapperRef.current]);

  return (
    <FormField
      {...props}
      type={props.multiline ? "textarea" : "text"}
      inputRef={inputRef}
      actionsRef={actionsRef}
      wrapperRef={wrapperRef}
      onChange={handleChange}
      rows={rowRange.min}
    />
  );

  function handleChange(newValue: string) {
    props.onChange && props.onChange(newValue);

    resize(inputRef, wrapperRef);
  }

  function insertText(text: string) {
    const input = inputRef.current;

    if (input) {
      insertAtCursor(input, text);

      const newValue = input.value;
      actionsRef.current?.setValue(newValue);
      props.onChange && props.onChange(newValue);
    }
  }
}

export const InputText = forwardRef(InputTextInternal);

function insertAtCursor(
  input: HTMLTextAreaElement | HTMLInputElement,
  newText: string,
) {
  const start = input.selectionStart || 0;
  const end = input.selectionEnd || 0;
  const text = input.value;
  const before = text.substring(0, start);
  const after = text.substring(end, text.length);
  input.value = before + newText + after;
  input.selectionStart = input.selectionEnd = start + newText.length;
  input.focus();
}
