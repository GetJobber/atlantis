/**
 * Type for data attributes on html elements since React.DataHTMLAttributes exposes way more attributs than data- attributes
 */
export interface DataAttributes {
  [key: `data-${string}`]: string | number | boolean | undefined;
}
