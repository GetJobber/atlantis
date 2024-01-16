import { MutableRefObject, useContext, useEffect, useRef } from "react";
import { ComboboxOption } from "../Combobox.types";
import { ComboboxContext } from "../ComboboxProvider";

interface useComboboxContent {
  optionsListRef: React.RefObject<HTMLUListElement>;
}

export function useComboboxContent(
  open: boolean,
  selected: ComboboxOption[],
): useComboboxContent {
  const { shouldScroll } = useContext(ComboboxContext);
  const optionsListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (open && shouldScroll.current && optionsListRef.current) {
      const firstSelected = Array.from(optionsListRef?.current?.children).find(
        child => {
          if (child instanceof HTMLElement) {
            return child.dataset.selected === "true";
          }
        },
      );

      scrollToFirstSelected(firstSelected, shouldScroll);
    }
  }, [open, selected]);

  return {
    optionsListRef,
  };
}

function scrollToFirstSelected(
  firstSelected: Element | undefined,
  shouldScroll: MutableRefObject<boolean>,
) {
  if (firstSelected) {
    firstSelected.scrollIntoView({
      block: "nearest",
    });

    shouldScroll.current = false;
  }
}
