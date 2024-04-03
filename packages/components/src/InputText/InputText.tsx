import React, { Ref, forwardRef, useImperativeHandle, useRef } from "react";
import { XOR } from "ts-xor";
import { useSafeLayoutEffect } from "@jobber/hooks/useSafeLayoutEffect";
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

type InputTextPropOptions = XOR<BaseProps, MultilineProps>;

// TODO refactor so not neeeded
// eslint-disable-next-line max-statements
function InputTextInternal(
  props: InputTextPropOptions,
  ref: Ref<InputTextRef>,
) {
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  const actionsRef = useRef<FieldActionsRef>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

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

  useSafeLayoutEffect(() => {
    if (
      wrapperRef &&
      wrapperRef.current instanceof HTMLDivElement &&
      inputRef.current &&
      inputRef.current instanceof HTMLTextAreaElement &&
      toolbarRef &&
      toolbarRef.current instanceof HTMLDivElement
    ) {
      resize(wrapperRef.current, inputRef.current, toolbarRef.current);
    }
  }, [wrapperRef.current, inputRef.current, toolbarRef.current]);

  return (
    <FormField
      {...props}
      type={props.multiline ? "textarea" : "text"}
      inputRef={inputRef}
      wrapperRef={wrapperRef}
      toolbarRef={toolbarRef}
      actionsRef={actionsRef}
      onChange={handleChange}
      rows={rowRange.min}
    />
  );

  function handleChange(newValue: string) {
    props.onChange && props.onChange(newValue);

    if (
      wrapperRef &&
      wrapperRef.current instanceof HTMLDivElement &&
      inputRef.current &&
      inputRef.current instanceof HTMLTextAreaElement &&
      toolbarRef &&
      toolbarRef.current instanceof HTMLDivElement
    ) {
      resize(wrapperRef.current, inputRef.current, toolbarRef.current);
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

  function resize(
    div: HTMLDivElement,
    textArea: HTMLTextAreaElement,
    toolbar: HTMLDivElement,
  ) {
    console.log("resize");
    if (rowRange.min === rowRange.max) return;

    div.style.height = "auto";
    // ew, fix
    console.log(textAreaHeight(textArea));
    div.style.height =
      textAreaHeight(textArea) +
      (toolbar.getClientRects()[0].height +
        parseInt(window.getComputedStyle(toolbar).marginTop, 10) * 2) +
      "px";
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
