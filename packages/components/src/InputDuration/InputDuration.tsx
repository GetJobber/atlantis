import React, { useState } from "react";
import { InputText } from "../InputText";
import { Typography } from "../Typography";

interface InputDurationProps {
  readonly defaultValue?: string;
  readonly onChange: (value: string) => void;
  readonly description?: string;
}

const mask = "**:**";
const delimiter = "*";

export function InputDuration({
  defaultValue,
  onChange,
  description,
}: InputDurationProps) {
  const [maskedVal, setMaskedVal] = useState(defaultValue);
  return (
    <div style={{ position: "relative" }}>
      <InputText
        defaultValue={defaultValue}
        value={maskedVal}
        onChange={handleChange}
      />
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
      </div>
      {description && (
        <div style={{ marginTop: 6 }}>
          <Typography size="small" textColor="textSecondary">
            {description}
          </Typography>
        </div>
      )}
    </div>
  );

  function handleChange(value: string) {
    const pattern = mask.split("");
    const specialChars = pattern.filter(char => char !== delimiter);
    const cleanVal = value
      .split("")
      .filter(char => !specialChars.includes(char));

    if (parseInt(cleanVal[2], 10) > 5) {
      return;
    }

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
    onChange && onChange(maskedValue);
  }
}
