import type { KeyboardEvent, MouseEvent } from "react";
import { useState } from "react";
import sortBy from "lodash/sortBy";
import { useLiveAnnounce } from "@jobber/hooks";
import type { InternalChipDismissibleProps } from "../InternalChipDismissibleTypes";

/**
 * Recursively finds a focusable element (div or button) in the specified direction
 */
function findFocusableElement(
  element: Element | null,
  direction: "previous" | "next",
): HTMLElement | null {
  if (!element) return null;

  const nextElement =
    direction === "previous"
      ? element.previousElementSibling
      : element.nextElementSibling;

  if (!nextElement) return null;

  // Check if element is a div or button
  if (
    nextElement instanceof HTMLElement &&
    (nextElement.tagName === "DIV" || nextElement.tagName === "BUTTON")
  ) {
    return nextElement;
  }

  // Recursively continue search
  return findFocusableElement(nextElement, direction);
}

export function useInternalChipDismissible({
  children,
  selected,
  onChange,
  onClick,
  onCustomAdd,
}: InternalChipDismissibleProps) {
  const [wrapperElement, setWrapperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const chipOptions = children.map(chip => chip.props);
  const visibleChipOptions = chipOptions.filter(chip =>
    selected.includes(chip.value),
  );
  const sortedVisibleChipOptions = sortBy(visibleChipOptions, chip =>
    selected.indexOf(chip.value),
  );
  const availableChipOptions = chipOptions.filter(
    chip => !selected.includes(chip.value),
  );

  const { liveAnnounce } = useLiveAnnounce();

  const actions = {
    handleChipRemove: (value: string) => {
      return () => {
        liveAnnounce(`${value} Removed`);
        onChange(selected.filter(val => val !== value));
      };
    },

    handleChipAdd: (value: string) => onChange([...selected, value]),
    handleCustomAdd: onCustomAdd,

    handleChipClick: (value: string) => {
      if (onClick === undefined) return;

      return (event: MouseEvent<HTMLButtonElement>) => onClick(event, value);
    },

    handleWrapperKeyDown: (
      event: KeyboardEvent<HTMLDivElement> & {
        target: HTMLElement;
      },
    ) => {
      const target = event.target;

      const isInputAndHasValue =
        target instanceof HTMLInputElement && target.value;
      if (isInputAndHasValue) return;

      if (event.key === "ArrowLeft") {
        const prevFocusable = findFocusableElement(target, "previous");

        if (prevFocusable) {
          prevFocusable.focus();
        }
      }

      if (event.key === "ArrowRight") {
        const nextFocusable = findFocusableElement(target, "next");

        if (nextFocusable) {
          nextFocusable.focus();
        }
      }
    },

    handleChipKeyDown: (value: string) => {
      return (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === "Backspace" || event.key === "Delete") {
          const target = event.target;

          if (target instanceof HTMLElement) {
            const prevFocusable = findFocusableElement(target, "previous");
            const nextFocusable = findFocusableElement(target, "next");

            if (prevFocusable) {
              prevFocusable.focus();
            } else if (nextFocusable) {
              nextFocusable.focus();
            }
          }
          actions.handleChipRemove(value)();
        }
      };
    },
  };

  return {
    ...actions,
    ref: setWrapperElement,
    wrapperElement,
    sortedVisibleChipOptions,
    availableChipOptions,
  };
}
