import React, { ReactElement, cloneElement } from "react";
import { FormFieldProps } from "../FormField";

interface InputMaskProps {
  readonly mask: string;
  readonly delimiter?: string;
  readonly children: ReactElement<FormFieldProps>;
}

export function InputMask({ mask, delimiter = "*", children }: InputMaskProps) {
  return (
    <div style={{ position: "relative" }}>
      {cloneElement(children, { onChange: handleChange })}
      <div
        style={{
          fontFamily: "var(--typography--fontFamily-normal)",
          fontSize: "var(--typography--fontSize-base)",
          color: "var(--color-grey)",
          position: "absolute",
          top: "20px",
          left: "17px",
          zIndex: 2,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <span style={{ opacity: 0 }}>{String(children.props.value)}</span>
        {placeholderValue()}
      </div>
    </div>
  );

  function placeholderValue() {
    return mask.replace(/\*/g, "_").slice(String(children.props.value).length);
  }

  function handleChange(value: string) {
    const pattern = mask.split("");
    const specialChars = pattern.filter(char => char !== delimiter);
    const cleanVal = value
      .split("")
      .filter(char => !specialChars.includes(char));
    const newMaskedValue = pattern.reduce((result, item) => {
      if (!cleanVal.length) return result;
      if (specialChars.includes(item)) {
        return result + item;
      } else if (item === delimiter) {
        return result + cleanVal.shift();
      } else {
        return result;
      }
    }, "");

    children.props.onChange?.(newMaskedValue);
  }
}
