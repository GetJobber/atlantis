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
type DataAttributes = Partial<Record<`data-${string}`, unknown>>;

export function filterDataAttributes<T extends object>(
  props: T,
): DataAttributes {
  return Object.keys(props).reduce((acc, key) => {
    if (key.startsWith("data-")) {
      acc[key as `data-${string}`] = props[key as keyof T];
    }

    return acc;
  }, {} as DataAttributes);
}
