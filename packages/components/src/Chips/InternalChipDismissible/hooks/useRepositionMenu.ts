import type { RefObject } from "react";
import { useState } from "react";
import { usePopper } from "react-popper";

export function useRepositionMenu(attachTo: RefObject<Element | null>) {
  const [positionElement, setPositionedElementRef] =
    useState<HTMLElement | null>();
  const popper = usePopper(attachTo.current, positionElement, {
    modifiers: [
      { name: "offset", options: { offset: [0, 8] } },
      { name: "flip", options: { fallbackPlacements: ["top"] } },
    ],
  });

  const targetWidth = attachTo.current?.clientWidth;

  return { ...popper, setPositionedElementRef, targetWidth };
}
