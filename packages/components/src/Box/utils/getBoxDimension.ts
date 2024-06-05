import type { BoxDimension } from "../Box.types";
import styles from "../styles/BoxDimension.css";

export const getHeightClassName = (value: BoxDimension) =>
  getClassName(value, "height");
export const getHeightVars = (value: BoxDimension) => getVars(value, "height");

export const getWidthClassName = (value: BoxDimension) =>
  getClassName(value, "width");
export const getWidthVars = (value: BoxDimension) => getVars(value, "width");

function getClassName(value: BoxDimension, prefix: string): string | undefined {
  if (typeof value === "string" && !value.endsWith("%")) {
    return (styles as Record<string, string | undefined>)[`${prefix}-${value}`];
  }

  return (styles as Record<string, string | undefined>)[`${prefix}-auto`];
}

function getVars(value: BoxDimension, prefix: string) {
  let size: string | undefined;

  if (typeof value === "string" && value.endsWith("%")) {
    size = value;
  } else if (typeof value === "number") {
    size = `${value}px`;
  }

  if (size) {
    return { [prefix]: size };
  }
}
