import classNames from "classnames";
import type { BoxProps, Sizes } from "../Box.types";
import marginStyles from "../styles/BoxMargin.module.css";
import paddingStyles from "../styles/BoxPadding.module.css";

type Size = BoxProps["padding"] | BoxProps["margin"];

// Padding
export const getPaddingClassNames = getClassNames;
export const getPaddingVars = getVars;

// Margin
export const getMarginClassNames = (size: Size) => getClassNames(size, true);
export const getMarginVars = (size: Size) => getVars(size, "--box-margin");

/**
 * Converts BoxSpace object values into class names.
 */
function getClassNames(size: Size, isMargin = false) {
  if (!size) return;

  const styles = isMargin ? marginStyles : paddingStyles;
  const className: string[] = [];

  if (typeof size === "string") {
    className.push(styles.base);

    // Return early since we don't need to process the object
    return classNames(className);
  }

  Object.keys(size).forEach(key =>
    className.push(` ${(styles as Record<string, string | undefined>)[key]}`),
  );

  return classNames(className);
}

/**
 * Converts BoxSpace object values into custom properties.
 */
function getVars(size: Size, basePrefix = "--box-padding") {
  if (!size) return;

  const customProperties: Record<string, string> = {};

  if (typeof size === "string") {
    customProperties[basePrefix] = `var(--space-${size})`;

    // Return early since we don't need to process the object
    return customProperties;
  }

  const paddingEntries: [string, Sizes][] = Object.entries(size);
  paddingEntries.forEach(([key, value]) => {
    customProperties[`${basePrefix}-${key}`] = `var(--space-${value})`;
  });

  return customProperties;
}
