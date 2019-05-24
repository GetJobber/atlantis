import React from "react";
import styles from "./ColorSwatch.css";

interface ColorSwatchProps {
  readonly name: string;
  readonly value: string;
}

export function ColorSwatch({ name, value }: ColorSwatchProps) {
  return (
    <div className={styles.swatch}>
      <div
        className={styles.color}
        style={{
          backgroundColor: value,
        }}
      />
      <div className={styles.name}>{name}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}
