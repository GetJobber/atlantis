import React, {
  Ref,
  RefObject,
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import { XOR } from "ts-xor";
import {
  CommonFormFieldProps,
  FieldActionsRef,
  FormField,
  FormFieldProps,
} from "../FormField";

export interface RowRange {
  min: number;
  max: number;
}

interface BaseProps
  extends CommonFormFieldProps,
    Pick<
      FormFieldProps,
      | "maxLength"
      | "readonly"
      | "autocomplete"
      | "keyboard"
      | "onEnter"
      | "onFocus"
      | "onBlur"
      | "onChange"
      | "validations"
      | "defaultValue"
      | "prefix"
      | "suffix"
    > {
  readonly multiline?: boolean;
  /**
   * Ref to the form field wrapper.
   */
  readonly formFieldRef?: Ref<HTMLDivElement>;
  /**
   *
   */
  readonly inputRef?: RefObject<HTMLInputElement | HTMLTextAreaElement>;
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

type InputTextPropOptions = XOR<BaseProps, MultilineProps>;

export type InputTextProps = InputTextPropOptions;

function InputTextInternal(
  props: InputTextPropOptions,
  ref: Ref<InputTextRef>,
) {
  const inputRefInner = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  const inputRef = props.inputRef || inputRefInner;
  const actionsRef = useRef<FieldActionsRef>(null);

  const rowRange = getRowRange();

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

  useLayoutEffect(() => {
    if (inputRef && inputRef.current instanceof HTMLTextAreaElement) {
      resize(inputRef.current);
    }
  }, [inputRef.current]);

  return (
    <FormField
      {...props}
      ref={props.formFieldRef}
      type={props.multiline ? "textarea" : "text"}
      inputRef={inputRef}
      actionsRef={actionsRef}
      onChange={handleChange}
      rows={rowRange.min}
    />
  );

  function handleChange(newValue: string) {
    props.onChange && props.onChange(newValue);

    if (inputRef && inputRef.current instanceof HTMLTextAreaElement) {
      resize(inputRef.current);
    }
  }

  function getRowRange(): RowRange {
    if (props.rows === undefined) {
      return { min: 3, max: 3 };
    } else if (typeof props.rows === "object") {
      return { min: props.rows.min, max: props.rows.max };
    } else {
      return { min: props.rows, max: props.rows };
    }
  }

  function resize(textArea: HTMLTextAreaElement) {
    if (rowRange.min === rowRange.max) return;

    textArea.style.height = "auto";
    textArea.style.height = textAreaHeight(textArea) + "px";
  }

  function textAreaHeight(textArea: HTMLTextAreaElement) {
    const {
      lineHeight,
      borderBottomWidth,
      borderTopWidth,
      paddingBottom,
      paddingTop,
    } = window.getComputedStyle(textArea);

    const maxHeight =
      rowRange.max * parseFloat(lineHeight) +
      parseFloat(borderTopWidth) +
      parseFloat(borderBottomWidth) +
      parseFloat(paddingTop) +
      parseFloat(paddingBottom);

    const scrollHeight =
      textArea.scrollHeight +
      parseFloat(borderTopWidth) +
      parseFloat(borderBottomWidth);

    return Math.min(scrollHeight, maxHeight);
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
