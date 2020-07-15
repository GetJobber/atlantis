import React, { Ref, createRef, forwardRef, useImperativeHandle } from "react";
import { XOR } from "ts-xor";
import { FormField, FormFieldProps } from "../FormField";

interface RowRange {
  min: number;
  max: number;
}

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

export interface InputTextRef {
  insert(text: string): void;
  blur(): void;
}

interface MultilineProps extends BaseProps {
  /**
   * Use this when you're expecting a long answer.
   */
  readonly multiline: true;

  /**
   * Specifies the visible height of a long answer form field. Can be in the
   * form of a single number to set a static height, or an associative array
   * with a min and max keys indicating the minimum number of visible rows, and
   * the maximum number of visible rows.
   */
  readonly rows?: number | RowRange;
}

type InputTextPropOptions = XOR<BaseProps, MultilineProps>;

function InputTextInternal(
  props: InputTextPropOptions,
  ref: Ref<InputTextRef>,
) {
  const inputRef = createRef<HTMLTextAreaElement | HTMLInputElement>();

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
  }));

  const lines = typeof props.rows === "object" ? props.rows.min : props.rows;

  return (
    <FormField
      {...props}
      type={props.multiline ? "textarea" : "text"}
      ref={inputRef}
      onChange={handleChange}
      rows={lines}
    />
  );

  function handleChange(newValue: string) {
    props.onChange && props.onChange(newValue);
    if (inputRef && inputRef.current instanceof HTMLTextAreaElement) {
      resize();
    }

    function resize() {
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
        inputRef.current.style.height = textAreaHeight() + "px";
      }
    }
    function textAreaHeight() {
      if (
        typeof props.rows === "object" &&
        inputRef.current &&
        typeof getLineHeight() === "number"
      ) {
        const maxHeight = props.rows.max * getLineHeight();
        return Math.min(inputRef.current.scrollHeight, maxHeight);
      }
      return undefined;
    }
    function getLineHeight() {
      if (inputRef.current) {
        const { fontSize, lineHeight } = window.getComputedStyle(
          inputRef.current,
        );
        const lh =
          lineHeight === "normal"
            ? parseFloat(fontSize) * 1.2
            : parseFloat(lineHeight);
        return lh;
      }
      return undefined;
    }
  }
  function insertText(text: string) {
    const input = inputRef.current;
    if (input) {
      insertAtCursor(input, text);
      props.onChange && props.onChange(input.value);
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
