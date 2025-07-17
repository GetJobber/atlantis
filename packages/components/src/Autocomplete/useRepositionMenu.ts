import { useSafeLayoutEffect } from "@jobber/hooks/useSafeLayoutEffect";
import { usePopper } from "react-popper";
import { MenuProps } from "./Autocomplete.types";

export interface UseRepositionMenu extends ReturnType<typeof usePopper> {
  readonly targetWidth: number | undefined;
}

export function useRepositionMenu(
  attachTo: MenuProps["attachTo"],
  externalMenuRef: HTMLElement | null,
  visible = false,
) {
  console.log({ attachTo, externalMenuRef, visible });
  const popper = usePopper(attachTo.current, externalMenuRef, {
    modifiers: [
      { name: "offset", options: { offset: [0, 8] } },
      { name: "flip", options: { fallbackPlacements: ["top"] } },
    ],
  });

  useSafeLayoutEffect(() => {
    popper?.update?.();
  }, [visible]);

  const targetWidth = attachTo.current?.clientWidth;

  return { ...popper, targetWidth };
}
