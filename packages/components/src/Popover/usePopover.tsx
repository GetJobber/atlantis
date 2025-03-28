import { usePopper } from "react-popper";
import { useState } from "react";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { PopoverProps } from "./types";

export const usePopover = ({
  preferredPlacement,
  attachTo,
  open,
}: Pick<PopoverProps, "preferredPlacement" | "attachTo" | "open">) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>();
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>();

  const { styles: popperStyles, attributes } = usePopper(
    isHTMLElement(attachTo) ? attachTo : attachTo.current,
    popperElement,
    {
      modifiers: buildModifiers(arrowElement),
      placement: preferredPlacement,
    },
  );
  useRefocusOnActivator(open);

  return { setPopperElement, setArrowElement, popperStyles, attributes };
};

function buildModifiers(arrowElement: HTMLElement | undefined | null) {
  const modifiers = [
    {
      name: "arrow",
      options: { element: arrowElement, padding: 10 },
    },
    {
      name: "offset",
      options: {
        offset: [0, 10],
      },
    },
    {
      name: "flip",
      options: {
        fallbackPlacements: ["auto"],
      },
    },
  ];

  return modifiers;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isHTMLElement(el: any): el is Element {
  return globalThis?.document && el instanceof Element;
}
