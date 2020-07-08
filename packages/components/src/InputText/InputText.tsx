import React, {
  Ref,
  createRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
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
   * Specifies the visible height of a long answer form field.
   */
  readonly rows?: number | { min: number; max: number };
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

  const [currentRows, setRows] = useState(initializeRows);

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
    if (!props.rows) return;
    if (props.rows.type === "number" && props.rows > 0) {
      return props.rows;
    } else {
      return props.rows.min;
    }
  }

  function handleChange(newValue: string) {
    props.onChange && props.onChange(newValue);
    if (
      props.rows &&
      inputRef &&
      inputRef.current instanceof HTMLTextAreaElement
    ) {
      if (
        calculateRows() >= props.rows.min &&
        calculateRows() <= props.rows.max
      ) {
        setRows(calculateRows());
      }
    }
  }

  function calculateRows() {
    const currentRef = inputRef.current as HTMLTextAreaElement;
    const textareaLineHeight = parseInt(
      window.getComputedStyle(currentRef).getPropertyValue("line-height"),
      10,
    );
    const textareaScrollHeight = currentRef.scrollHeight;

    return Math.floor(textareaScrollHeight / textareaLineHeight) - 1;
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
