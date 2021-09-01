import React from "react";
import copy from "copy-text-to-clipboard";
import { Button } from "@jobber/components/Button";
import { showToast } from "@jobber/components/Toast";
import styles from "./ColorSwatches.module.css";

interface ColorSwatchesProps {
  readonly colors: string[];
}

export function ColorSwatches({ colors }: ColorSwatchesProps) {
  return (
    <div className={styles.colorbar}>
      {colors.map(color => (
        <Color key={color} color={color} />
      ))}
    </div>
  );
}

interface ColorProps {
  readonly color: string;
}

function Color({ color }: ColorProps) {
  const style = {
    backgroundColor: `var(${color})`,
  };
  return (
    <div className={styles.color}>
      <div key={color} style={style} className={styles.swatch} />
      <pre className={styles.pre}>{color}</pre>
      <Button
        size="small"
        label="Copy to clipboard"
        type="tertiary"
        onClick={handleClick}
      />
    </div>
  );

  function handleClick() {
    copy(`var(${color})`);
    showToast({
      message: `Color ${color} copied to clipboard`,
    });
  }
}
