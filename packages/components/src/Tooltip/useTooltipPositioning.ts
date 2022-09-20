import { useRef, useState } from "react";
import { usePopper } from "react-popper";

export function useTooltipPositioning() {
  const shadowRef = useRef<HTMLSpanElement>(null);
  const [positionElement, setTooltipRef] = useState<HTMLDivElement | null>();
  const [arrowElement, setArrowRef] = useState<HTMLDivElement | null>();

  const popper = usePopper(
    shadowRef.current?.nextElementSibling,
    positionElement,
    {
      placement: "top",
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
    placement: popper.state?.placement,
    shadowRef,
    setArrowRef,
    setTooltipRef,
  };
}
