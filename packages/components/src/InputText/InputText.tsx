import React, { Ref, createRef, forwardRef, useImperativeHandle } from "react";
import { XOR } from "ts-xor";
import { FormField, FormFieldProps } from "../FormField";

/**
 * The following is the same as:
 *   type BaseProps = Omit<FormFieldProps, "type" | "children">;
 * Unfortunately Docz doesn't currently support Omit so it has been reduced to
 * its component parts.
 */
type BaseProps = Pick<
  FormFieldProps,
  Exclude<keyof FormFieldProps, "type" | "children" | "rows" | "min" | "max">
>;

interface InputTextRef {
  insert(text: string): void;
}

interface MultilineProps extends BaseProps {
  /**
   * Use this when you're expecting a long answer.
   */
  readonly multiline: true;

  /**
   * Specifies the visible height of a long answer form field.
   */
  readonly rows?: number;
}

type InputTextPropOptions = XOR<BaseProps, MultilineProps>;

function InputTextInternal(
  props: InputTextPropOptions,
  ref: Ref<InputTextRef>,
) {
  const inputRef = createRef<HTMLTextAreaElement>();

  useImperativeHandle(ref, () => ({
    insert: (text: string) => {
      insertText(text);
    },
  }));

  return (
    <FormField
      type={props.multiline ? "textarea" : "text"}
      ref={inputRef}
      {...props}
    />
  );

  function insertText(text: string) {
    const input = inputRef.current;
    if (input) {
      insertAtCursor(input, text);
      props.onChange && props.onChange(input.value);
    }
  }
}

export const InputText = forwardRef(InputTextInternal);

function insertAtCursor(input: HTMLTextAreaElement, newText: string) {
  var start = input.selectionStart || 0;
  var end = input.selectionEnd || 0;
  var text = input.value;
  var before = text.substring(0, start);
  var after = text.substring(end, text.length);
  input.value = before + newText + after;
  input.selectionStart = input.selectionEnd = start + newText.length;
  input.focus();
}
