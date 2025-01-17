import React, { Ref, forwardRef, useImperativeHandle, useRef } from "react";
import { InputTextLegacyProps, InputTextRef } from "./InputText.types";
import { useTextAreaResize } from "./useTextAreaResize";
import { FieldActionsRef, FormField } from "../FormField";

function InputTextInternal(
  props: InputTextLegacyProps,
  ref: Ref<InputTextRef>,
) {
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  const actionsRef = useRef<FieldActionsRef>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { resize, rowRange } = useTextAreaResize({
    rows: props.rows,
    value: props.value,
    inputRef,
    wrapperRef,
  });

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

    resize();
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
