import React from "react";
import styles from "./ColorSwatch.css";

interface ColorSwatchProps {
  readonly name: string;
  readonly value: string;
}

export function ColorSwatch({ name, value }: ColorSwatchProps) {
  return (
    <div className={styles.swatchBox}>
      <div
        className={styles.swatch}
        style={{
          backgroundColor: value,
        }}
      />
      <div className={styles.colorName}>{name}</div>
      <div className={styles.colorValue}>{value}</div>
    </div>
  );
}
