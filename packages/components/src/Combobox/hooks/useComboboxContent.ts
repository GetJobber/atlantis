import { MutableRefObject, useContext, useEffect, useRef } from "react";
import { type ComboboxOption } from "../Combobox.types";
import { ComboboxContext } from "../ComboboxProvider";

interface useComboboxContent {
  optionsListRef: React.RefObject<HTMLUListElement>;
  onClear?: () => void;
  onSelectAll?: (selection: ComboboxOption[]) => void;
}

export function useComboboxContent(
  open: boolean,
  selected: ComboboxOption[],
): useComboboxContent {
  const { onClear, onSelectAll, shouldScroll } = useContext(ComboboxContext);
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
    onClear,
    onSelectAll,
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
