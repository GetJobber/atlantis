import { tokens } from "@jobber/design";

export interface MaxHeightOptions {
  /**
   * The preferred maximum height in pixels
   */
  readonly maxHeight: number;

  /**
   * The minimum height in pixels to maintain even when space is constrained
   */
  readonly minHeight: number;

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
 * - Ensuring the result never goes below a specified minimum height
 *
 * @param availableHeight - The available height from FloatingUI's size middleware
 * @param options - Configuration for max height, min height, and edge padding
 * @returns The calculated max height in pixels
 */
export function calculateMaxHeight(
  availableHeight: number,
  options: MaxHeightOptions,
): number {
  const { maxHeight, minHeight, edgePadding = tokens["space-base"] } = options;

  // If we have more space than our preferred max, use the preferred max
  if (availableHeight > maxHeight) {
    return maxHeight;
  }

  // Otherwise, use available space minus edge padding, but ensure we don't go below minimum
  return Math.max(minHeight, availableHeight - edgePadding);
}
