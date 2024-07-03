import classnames from "classnames";
import borderStyles from "../styles/BoxBorder.css";

// Borders
export const getBorderClassNames = <T>(size: T) =>
  getClassNames<T>({
    defaultClass: "border",
    prefix: "border",
    size,
    styles: borderStyles,
  });
export const getBorderVars = <T>(size: T) =>
  getVars<T>({ size, tokenPrefix: "border", varPrefix: "border" });

interface GetClassNamesParams<T> {
  readonly defaultClass?: string;
  readonly prefix: string;
  readonly size: T;
  readonly styles: Record<string, string>;
}

export function getClassNames<T>({
  defaultClass,
  prefix,
  size,
  styles,
}: GetClassNamesParams<T>) {
  if (!size) return;
  const className: (string | undefined)[] = [
    defaultClass && styles[defaultClass],
  ];

  if (typeof size === "string") {
    className.push(styles[`${prefix}-base`]);

    // Return early since we don't need to process the object
    return classnames(className);
  }

  Object.keys(size).forEach(key => className.push(styles[`${prefix}-${key}`]));

  return classnames(className);
}

interface GetVarsParams<T> {
  readonly size: T;
  readonly tokenPrefix: string;
  readonly varPrefix: string;
}

export function getVars<T>({ size, tokenPrefix, varPrefix }: GetVarsParams<T>) {
  if (!size) return;

  const fullPrefix = `--box-${varPrefix}`;
  const customProperties: Record<string, string> = {};

  if (typeof size === "string") {
    customProperties[fullPrefix] = `var(--${tokenPrefix}-${size})`;

    // Return early since we don't need to process the object
    return customProperties;
  }

  const entries: [string, T][] = Object.entries(size);
  entries.forEach(([key, value]) => {
    customProperties[`${fullPrefix}-${key}`] = `var(--${tokenPrefix}-${value})`;
  });

  return customProperties;
}
