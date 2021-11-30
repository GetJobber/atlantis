import React, { useState } from "react";
import { InputText } from "../InputText";

export function InputMask() {
  const mask = "+* (***) ***-****";
  const delimiter = "*";
  const [maskedVal, setMaskedVal] = useState("");
  return (
    <div style={{ position: "relative" }}>
      <InputText value={maskedVal} onChange={handleChange} />
      <div
        style={{
          position: "absolute",
          top: "14px",
          fontSize: "16px",
          left: "17px",
          zIndex: 2,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <span style={{ opacity: 0 }}>{maskedVal}</span>
        {maskValue()}
      </div>
    </div>
  );

  function maskValue() {
    return mask.replace(/\*/g, "_").slice(maskedVal.length);
  }

  function handleChange(value: string) {
    const pattern = mask.split("");
    const specialChars = pattern.filter(char => char !== delimiter);
    const cleanVal = value
      .split("")
      .filter(char => !specialChars.includes(char));
    const maskedValue = pattern.reduce((result, item) => {
      if (!cleanVal.length) return result;
      if (specialChars.includes(item)) {
        return result + item;
      } else if (item === delimiter) {
        return result + cleanVal.shift();
      } else {
        return result;
      }
    }, "");
    setMaskedVal(maskedValue);
  }
}
