import { tokens } from "@jobber/design";

export interface MaxHeightOptions {
  /**
   * The preferred maximum height in pixels
   */
  readonly maxHeight: number;

  /**
   * Edge padding to ensure the element doesn't touch screen edges
   * @default tokens["space-base"]
   */
  readonly edgePadding?: number;
}

/**
 * Calculates the appropriate max height for floating elements based on available space.
 *
 * This utility encapsulates the common pattern of:
 * - Using a preferred max height when space allows
 * - Falling back to available height minus edge padding when constrained
 *
 * @param availableHeight - The available height from FloatingUI's size middleware
 * @param options - Configuration for max height, and edge padding
 * @returns The calculated max height in pixels
 */
export function calculateMaxHeight(
  availableHeight: number,
  options: MaxHeightOptions,
): number {
  const { maxHeight, edgePadding = tokens["space-base"] } = options;

  if (availableHeight > maxHeight) {
    return maxHeight;
  }

  return Math.min(maxHeight, Math.max(availableHeight - edgePadding, 0));
}
