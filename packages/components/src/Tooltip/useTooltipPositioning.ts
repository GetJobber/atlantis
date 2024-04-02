import { useRef, useState } from "react";
import { usePopper } from "react-popper";
import { Placement } from "./Tooltip.types";

const DEFAULT_PLACEMENT: Placement = "top";

interface ToolTipPositionOptions {
  readonly preferredPlacement?: Placement;
}

export function useTooltipPositioning({
  preferredPlacement,
}: ToolTipPositionOptions) {
  const shadowRef = useRef<HTMLSpanElement>(null);
  const [positionElement, setTooltipRef] = useState<HTMLDivElement | null>();
  const [arrowElement, setArrowRef] = useState<HTMLDivElement | null>();

  const popper = usePopper(
    shadowRef.current?.nextElementSibling,
    positionElement,
    {
      placement: preferredPlacement,
      modifiers: [
        { name: "flip", options: { fallbackPlacements: ["bottom"] } },
        {
          name: "arrow",
          options: { element: arrowElement },
        },
      ],
    },
  );

  return {
    ...popper,
    placement: popper.state?.placement || DEFAULT_PLACEMENT,
    shadowRef,
    setArrowRef,
    setTooltipRef,
  };
}
