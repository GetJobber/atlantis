import {
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  limitShift,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react";
import { useMemo, useState } from "react";
import { useRefocusOnActivator } from "@jobber/hooks";
import type { PopoverProps } from "./Popover.types";

const POPOVER_OFFSET = 10;
const POPOVER_SHIFT_PADDING = 8;
const POPOVER_ARROW_PADDING = 6;

export const usePopover = ({
  preferredPlacement,
  attachTo,
  open,
}: Pick<PopoverProps, "preferredPlacement" | "attachTo" | "open">) => {
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>();

  const modifiers = useMemo(() => {
    const baseModifiers = [
      offset(POPOVER_OFFSET),
      shift({
        mainAxis: true,
        crossAxis: false,
        padding: POPOVER_SHIFT_PADDING,
        limiter: limitShift(),
      }),
    ];

    const placementMiddleware =
      preferredPlacement === "auto"
        ? autoPlacement({
            allowedPlacements: ["top", "bottom", "left", "right"],
          })
        : flip({
            fallbackPlacements: ["top", "bottom", "left", "right"],
          });

    return [
      ...baseModifiers,
      placementMiddleware,
      arrow({
        element: arrowElement || null,
        padding: POPOVER_ARROW_PADDING,
      }),
    ];
  }, [arrowElement, preferredPlacement]);

  const referenceElement = isHTMLElement(attachTo)
    ? attachTo
    : attachTo.current;

  const { refs, floatingStyles, middlewareData, placement } = useFloating({
    placement: preferredPlacement === "auto" ? undefined : preferredPlacement,
    strategy: "absolute",
    middleware: modifiers,
    elements: {
      reference: referenceElement || null,
    },
    // Only use this option when the floating element is conditionally rendered
    // (which we are), not hidden with css. https://floating-ui.com/docs/autoUpdate
    whileElementsMounted: autoUpdate,
  });

  useRefocusOnActivator(open);

  return {
    setFloatingElement: refs.setFloating,
    setArrowElement,
    floatingStyles: {
      float: floatingStyles,
      arrow: middlewareData.arrow,
    },
    placement,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isHTMLElement(el: any): el is Element {
  return globalThis?.document && el instanceof Element;
}
