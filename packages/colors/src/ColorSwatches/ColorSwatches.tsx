import React from "react";
import { ColorSwatch } from "../ColorSwatch";
import styles from "./ColorSwatches.css";

interface Color {
  readonly name: string;
  readonly value: string;
}

interface ColorGroup {
  [name: string]: Color[];
}

interface ColorDictionary {
  [color: string]: string;
}

interface ColorSwatchesProps {
  readonly colors: ColorDictionary;
}

export function ColorSwatches({ colors }: ColorSwatchesProps) {
  const groupedColors = groupColors(colors);

  return Object.entries(groupedColors).map(([name, colors]) => (
    <>
      <h3 className={styles.groupTitle}>{name}</h3>
      <div className={styles.swatchGroup} key={name}>
        {colors.map(({ name, value }) => (
          <ColorSwatch name={name} value={value} key={name} />
        ))}
      </div>
    </>
  ));
}

function groupColors(colors: ColorDictionary): ColorGroup {
  return Object.entries(colors).reduce((colorGroups, [name, value]) => {
    const colorGroup = name.split("-")[3];
    colorGroups[colorGroup] = colorGroups[colorGroup] || [];
    colorGroups[colorGroup].push({ name, value });

    return colorGroups;
  }, {});
}
