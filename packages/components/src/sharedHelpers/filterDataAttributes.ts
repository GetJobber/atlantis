/**
 * Filters and returns all data-* attributes from props.
 * This allows components to accept standard HTML data attributes
 * in their natural hyphenated syntax (e.g., data-test-id, data-loading).
 *
 * @param props - The component props object
 * @returns An object containing only the data-* attributes
 *
 * @example
 * ```tsx
 * const dataAttrs = filterDataAttributes(props);
 * return <input {...dataAttrs} />;
 * ```
 */
export function filterDataAttributes(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any,
): Record<string, unknown> {
  return Object.keys(props).reduce((acc, key) => {
    if (key.startsWith("data-")) {
      acc[key] = props[key];
    }

    return acc;
  }, {} as Record<string, unknown>);
}
