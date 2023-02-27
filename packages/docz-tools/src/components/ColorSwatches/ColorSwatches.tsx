import React from "react";
import { Button } from "@jobber/components/Button";
import { showToast } from "@jobber/components/Toast";
import styles from "./ColorSwatches.module.css";

interface ColorSwatchesProps {
  readonly colors: string[];
}

export function ColorSwatches({ colors }: ColorSwatchesProps) {
  return (
    <div className={styles.colorbar}>
      {colors.map((color: string) => (
        <Color key={color} color={color} />
      ))}
    </div>
  );
}

interface ColorProps {
  readonly color: string;
}

function Color({ color }: ColorProps) {
  const colorsWithBorders = [
    "--color-overlay--dimmed",
    "--color-surface",
    "--color-text--reverse",
  ];
  const style = {
    backgroundColor: `var(${color})`,
    border: colorsWithBorders.includes(color)
      ? "1px solid var(--color-border)"
      : undefined,
  };

  return (
    <div className={styles.color}>
      <div key={color} style={style} className={styles.swatch}>
        <div className={styles.button}>
          <Button size="small" icon="copy" onClick={handleClick} />
        </div>
      </div>
      <pre className={styles.pre}>{color}</pre>
    </div>
  );

  function handleClick() {
    navigator.clipboard.writeText(`var(${color})`);
    showToast({
      message: `Color ${color} copied to clipboard`,
    });
  }
}
