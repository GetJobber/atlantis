import {
  Placement,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react";
import { useMemo, useState } from "react";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { PopoverProps } from "./Popover.types";

export const usePopover = ({
  preferredPlacement,
  attachTo,
  open,
}: Pick<PopoverProps, "preferredPlacement" | "attachTo" | "open">) => {
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>();

  const modifiers = useMemo(() => {
    return [
      offset(10),
      flip({
        fallbackPlacements: ["top", "bottom", "left", "right"],
      }),
      //update this for arrow
      arrow({
        element: arrowElement || null,
        padding: 10,
      }),
      shift({ mainAxis: true, crossAxis: true, padding: 8 }),
      // autoUpdate(referenceElement, floatingElement, {
      //   animationFrame: true,
      // }),
    ];
  }, [arrowElement]);

  const referenceElement = isHTMLElement(attachTo)
    ? attachTo
    : attachTo.current;

  const { refs, floatingStyles } = useFloating({
    placement: (preferredPlacement === "auto"
      ? "bottom"
      : preferredPlacement) as Placement,
    middleware: modifiers,
    elements: {
      reference: referenceElement || null,
    },
    whileElementsMounted: autoUpdate,
  });

  useRefocusOnActivator(open);

  return {
    setPopperElement: refs.setFloating,
    setArrowElement,
    popperStyles: { popper: floatingStyles },
    attributes: { popper: {} },
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isHTMLElement(el: any): el is Element {
  return globalThis?.document && el instanceof Element;
}
