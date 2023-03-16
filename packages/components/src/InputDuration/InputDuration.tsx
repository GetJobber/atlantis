import React, { useState } from "react";
import styles from "./InputDuration.css";
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
    <div className={styles.container}>
      <InputText
        defaultValue={defaultValue}
        value={maskedVal}
        onChange={handleChange}
        placeholder="Duration"
      />
      <div className={styles.textWrapper} aria-hidden="true">
        <span className={styles.maskText}>{maskedVal}</span>
      </div>
      {description && (
        <div className={styles.description}>
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

    /**
     * Validation to check any not number or number > 59 (for minutes)
     *  */
    if (
      parseInt(cleanVal[2], 10) > 5 ||
      cleanVal.filter(i => isNaN(parseInt(i, 10))).length > 0
    ) {
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
