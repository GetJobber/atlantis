import React, { useEffect } from "react";
import classnames from "classnames";
import { FormField, FormFieldProps } from "../FormField";
import styles from "./InputTemplate.css";

/**
 * The following is the same as:
 *   type BaseProps = Omit<FormFieldProps, "type" | "children">;
 * Unfortunately Docz doesn't currently support Omit so it has been reduced to
 * its component parts.
 */
interface InputTemplateProps
  extends Pick<
    FormFieldProps,
    Exclude<keyof FormFieldProps, "type" | "children" | "rows" | "min" | "max">
  > {
  registerInserter(inserter: { current?: (text: string) => void }): void;
}

export function InputTemplate(props: InputTemplateProps) {
  const inputRef = React.createRef<HTMLInputElement>();
  const className = classnames(styles.inputTemplate);

  useEffect(() => {
    if (inputRef.current && inputRef.current.focus) {
      props.registerInserter({ current: insertText });
    }
  });

  return (
    <div className={className}>
      <FormField
        {...props}
        type="textarea"
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );

  function handleFocus() {
    props.registerInserter({ current: insertText });
    props.onFocus && props.onFocus();
  }

  function handleBlur() {
    props.onBlur && props.onBlur();
  }

  function insertText(text: string) {
    const input = inputRef.current;
    if (input) {
      insertAtCursor(input, text);
      props.onChange && props.onChange(input.value);
    }
  }
}

function insertAtCursor(input: HTMLInputElement, newText: string) {
  var start = input.selectionStart || 0;
  var end = input.selectionEnd || 0;
  var text = input.value;
  var before = text.substring(0, start);
  var after = text.substring(end, text.length);
  input.value = before + newText + after;
  input.selectionStart = input.selectionEnd = start + newText.length;
  input.focus();
}
