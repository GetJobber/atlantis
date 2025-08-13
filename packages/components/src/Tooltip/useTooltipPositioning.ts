import { useRef, useState } from "react";
import {
  arrow,
  autoUpdate,
  flip,
  limitShift,
  shift,
  useFloating,
} from "@floating-ui/react";
import { Placement } from "./Tooltip.types";

const TOOLTIP_SHIFT_PADDING = 8;
const TOOLTIP_ARROW_PADDING = 6;

interface ToolTipPositionOptions {
  readonly preferredPlacement?: Placement;
}

export function useTooltipPositioning({
  preferredPlacement,
}: ToolTipPositionOptions) {
  const shadowRef = useRef<HTMLSpanElement>(null);
  const [arrowElement, setArrowRef] = useState<HTMLDivElement | null>();

  const referenceElement = shadowRef.current?.nextElementSibling;

  const { refs, floatingStyles, middlewareData, placement } = useFloating({
    placement: preferredPlacement,
    strategy: "absolute",
    middleware: [
      shift({
        mainAxis: true,
        crossAxis: false,
        padding: TOOLTIP_SHIFT_PADDING,
        limiter: limitShift(),
      }),
      flip({ fallbackPlacements: ["bottom", "left", "right"] }),
      arrow({
        element: arrowElement || null,
        padding: TOOLTIP_ARROW_PADDING,
      }),
    ],
    elements: {
      reference: referenceElement || null,
    },
    whileElementsMounted: autoUpdate,
  });

  return {
    styles: {
      float: floatingStyles,
      arrow: middlewareData.arrow,
    },
    placement: placement,
    shadowRef,
    setArrowRef,
    setTooltipRef: refs.setFloating,
  };
}
