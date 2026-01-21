export interface ContentOverlayConfig {
  fullScreen: boolean;
  adjustToContentHeight: boolean;
  isDraggable: boolean;
  hasOnBeforeExit: boolean;
  showDismiss: boolean;
}

export interface ContentOverlayState {
  isScreenReaderEnabled: boolean;
  position: "top" | "initial";
}

export type InitialHeight = "fullScreen" | "contentHeight";

export interface ContentOverlayBehavior {
  initialHeight: InitialHeight;
  isDraggable: boolean;
  showDismiss: boolean;
}

/**
 * Computes the abstract behavior of ContentOverlay from its props and state.
 *
 * This pure function documents and centralizes the complex logic that determines:
 * - Initial height mode (fullScreen vs contentHeight)
 * - Whether the overlay is draggable
 * - Whether the dismiss button should be shown
 *
 * The logic accounts for legacy behavior where:
 * - `onBeforeExit` silently overrides `isDraggable` to false
 * - Default props (neither fullScreen nor adjustToContentHeight) are treated
 *   as contentHeight for the new implementation
 * - Dismiss button visibility depends on multiple factors including position state
 */
export function computeContentOverlayBehavior(
  config: ContentOverlayConfig,
  state: ContentOverlayState,
): ContentOverlayBehavior {
  const initialHeight = computeInitialHeight(config);
  const isDraggable = computeIsDraggable(config);
  const showDismiss = computeShowDismiss(config, state);

  return {
    initialHeight,
    isDraggable,
    showDismiss,
  };
}

/**
 * Height determination:
 * - fullScreen: true → "fullScreen"
 * - Otherwise → "contentHeight" (default and adjustToContentHeight treated the same)
 *
 * Note: The legacy snapPoint calculation for the default case is obsolete.
 * adjustToContentHeight was added later and made it redundant.
 */
function computeInitialHeight(config: ContentOverlayConfig): InitialHeight {
  if (config.fullScreen) {
    return "fullScreen";
  }

  return "contentHeight";
}

/**
 * Draggability determination:
 * - hasOnBeforeExit: true → false (silent override, regardless of isDraggable prop)
 * - Otherwise → use isDraggable prop value
 *
 * This silent override exists because onBeforeExit needs to intercept close attempts,
 * and dragging would bypass that interception.
 */
function computeIsDraggable(config: ContentOverlayConfig): boolean {
  if (config.hasOnBeforeExit) {
    return false;
  }

  return config.isDraggable;
}

/**
 * Dismiss button visibility:
 * - showDismiss: true → show (explicit prop takes priority)
 * - isScreenReaderEnabled: true → show (accessibility requirement)
 * - fullScreen: true → show (no other way to close)
 * - !adjustToContentHeight && position === "top" → show (legacy behavior for drag-to-top)
 * - Otherwise → hide
 *
 * Note: The position-based logic only triggers when the overlay has been dragged to the top,
 * which requires isDraggable to be true. Position starts as "initial" and can only become
 * "top" through user interaction.
 */
function computeShowDismiss(
  config: ContentOverlayConfig,
  state: ContentOverlayState,
): boolean {
  if (config.showDismiss) {
    return true;
  }

  if (state.isScreenReaderEnabled) {
    return true;
  }

  if (config.fullScreen) {
    return true;
  }

  if (!config.adjustToContentHeight && state.position === "top") {
    return true;
  }

  return false;
}
