import {
  autoUpdate,
  flip,
  offset,
  size,
  useFloating,
} from "@floating-ui/react";
import { calculateMaxHeight } from "@jobber/components/utils/maxHeight";

export interface UseRepositionMenu {
  readonly setFloatingRef: (ref: HTMLElement | null) => void;
  readonly styles: {
    float: React.CSSProperties;
  };
}

const ROUNDED_BORDER_ARROW_EDGE_OFFSET = 8;
const PREFERRED_MAX_HEIGHT = 320;

export function useRepositionMenu(
  attachTo: HTMLElement | null,
): UseRepositionMenu {
  const { refs, floatingStyles } = useFloating({
    placement: "bottom",
    middleware: [
      offset(ROUNDED_BORDER_ARROW_EDGE_OFFSET),
      flip({ fallbackPlacements: ["top"] }),
      size({
        apply({ availableHeight, elements, rects }) {
          const maxHeight = calculateMaxHeight(availableHeight, {
            maxHeight: PREFERRED_MAX_HEIGHT,
          });

          Object.assign(elements.floating.style, {
            maxHeight: `${maxHeight}px`,
            maxWidth: `${rects.reference.width}px`,
          });
        },
      }),
    ],
    elements: {
      reference: attachTo,
    },
    whileElementsMounted: autoUpdate,
  });

  return {
    setFloatingRef: refs.setFloating,
    styles: {
      float: floatingStyles,
    },
  };
}
