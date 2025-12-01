import type React from "react";

/**
 * Handler that prevents default pointer behavior.
 * Used to prevent blur/focus issues when clicking on non-interactive menu elements.
 */
export function preventDefaultPointerDown(e: React.PointerEvent): void {
  e.preventDefault();
}

/**
 * Creates a handler for pointer down events on interactive menu items (options/actions).
 * Prevents default to avoid blur and sets flag for focus management.
 *
 * @param isHandlingMenuInteractionRef - Ref to track if a menu interaction is in progress
 * @returns A pointer down event handler
 */
export function createInteractionPointerDownHandler(
  isHandlingMenuInteractionRef: React.RefObject<boolean>,
): (e: React.PointerEvent) => void {
  return (e: React.PointerEvent) => {
    e.preventDefault();
    // Set flag to prevent blur/focus handlers from interfering
    isHandlingMenuInteractionRef.current = true;
  };
}
