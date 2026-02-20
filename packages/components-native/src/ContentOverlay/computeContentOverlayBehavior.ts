export interface ContentOverlayConfig {
  fullScreen: boolean;
  adjustToContentHeight: boolean;
  isDraggable: boolean;
  hasOnBeforeExit: boolean;
  showDismiss: boolean;
}

export interface ContentOverlayState {
  isScreenReaderEnabled: boolean;
  // Pixel value of delta to the 100% position
  position: number;
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
  const isDraggable = computeIsDraggable(config);
  const initialHeight = computeInitialHeight(config, isDraggable);
  const showDismiss = computeShowDismiss(config, state);

  return {
    initialHeight,
    isDraggable,
    showDismiss,
  };
}

/**
 * Order is important to maintain legacy behavior, despite the questionable logic.
 * A non draggable overlay wants to be fullscreen, so as to have the dismiss button be visible.
 * There is an invalid combination here with adjustToContentHeight and onBeforeExit which in turn overrides isDraggable to false.
 * This requires an explicit showDismiss=true or else it will not be possible to dismiss the overlay.
 */
function computeInitialHeight(
  config: ContentOverlayConfig,
  isDraggable: boolean,
): InitialHeight {
  if (config.adjustToContentHeight) {
    return "contentHeight";
  }

  if (config.fullScreen) {
    return "fullScreen";
  }

  if (!isDraggable) {
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
 * The idea behind fullscreen having it is that there may be little room to tap the background to dismiss.
 * While this logic is redundant with the position, it's a relic of the legacy behavior where position didn't update in time.
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

  if (!config.adjustToContentHeight && state.position === 0) {
    return true;
  }

  return false;
}
