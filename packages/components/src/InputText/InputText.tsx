import React, {
  Ref,
  createRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
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

  const [currentRows, setRows] = useState(initializeRows());

  return (
    <FormField
      {...props}
      type={props.multiline ? "textarea" : "text"}
      ref={inputRef}
      onChange={handleChange}
      rows={currentRows}
    />
  );

  function initializeRows() {
    if (typeof props.rows === "object") {
      return props.rows.min;
    }
    return props.rows;
  }

  function handleChange(newValue: string) {
    props.onChange && props.onChange(newValue);
    if (
      props.rows &&
      typeof props.rows !== "number" &&
      inputRef &&
      inputRef.current instanceof HTMLTextAreaElement
    ) {
      const calculatedRows = getCalculatedRows(inputRef.current);

      if (
        calculatedRows >= props.rows.min &&
        calculatedRows <= props.rows.max
      ) {
        setRows(calculatedRows);
      }
    }
  }

  function getCalculatedRows(currentInputRef: HTMLElement) {
    const currentRef = currentInputRef as HTMLTextAreaElement;
    const textareaLineHeight = parseInt(
      window.getComputedStyle(currentRef).getPropertyValue("line-height"),
      10,
    );
    const textareaScrollHeight = currentRef.scrollHeight;
    return calculateRows(textareaScrollHeight, textareaLineHeight);
  }

  function insertText(text: string) {
    const input = inputRef.current;
    if (input) {
      insertAtCursor(input, text);
      props.onChange && props.onChange(input.value);
    }
  }
}

export function calculateRows(scrollHeight: number, lineHeight: number) {
  return Math.floor(scrollHeight / lineHeight) - 1;
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
