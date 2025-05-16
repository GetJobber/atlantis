import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";
import sortBy from "lodash/sortBy";
import { useLiveAnnounce } from "@jobber/hooks/useLiveAnnounce";
import { InternalChipDismissibleProps } from "../InternalChipDismissibleTypes";
import { ChipProps } from "../../Chip";

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
  controlled = false,
}: InternalChipDismissibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const chipOptions = children.map(chip => chip.props);

  // In controlled mode, we need to maintain a cache of all chip options we've seen
  // to ensure selected chips are always displayed even when filtered out during search
  const [chipOptionsCache, setChipOptionsCache] = useState<
    Record<string, ChipProps>
  >({});

  // Update the cache whenever we see new chips
  useEffect(() => {
    if (controlled) {
      let hasChanges = false;
      const newCache = { ...chipOptionsCache };

      // Only add new options to the cache
      chipOptions.forEach(option => {
        if (
          !chipOptionsCache[option.value] ||
          JSON.stringify(chipOptionsCache[option.value]) !==
            JSON.stringify(option)
        ) {
          newCache[option.value] = option;
          hasChanges = true;
        }
      });

      // Only update state if we have new or changed options
      if (hasChanges) {
        setChipOptionsCache(newCache);
      }
    }
  }, [controlled, chipOptions]);

  // In controlled mode, determine visible chips from both current options and cache
  const getVisibleChipOptions = () => {
    if (!controlled) {
      // Standard mode: filter current children to get visible chips
      return chipOptions.filter(chip => selected.includes(chip.value));
    }

    // Controlled mode: ensure all selected chips are included
    // First gather selected options from current children
    const selectedOptionsMap: Record<string, ChipProps> = {};

    // Add any options from current children that are selected
    chipOptions.forEach(chip => {
      if (selected.includes(chip.value)) {
        selectedOptionsMap[chip.value] = chip;
      }
    });

    // For any selected values not in current children, get from cache
    selected.forEach(value => {
      if (!selectedOptionsMap[value] && chipOptionsCache[value]) {
        selectedOptionsMap[value] = chipOptionsCache[value];
      }
    });

    // Convert to array and return
    return Object.values(selectedOptionsMap);
  };

  const visibleChipOptions = getVisibleChipOptions();
  const sortedVisibleChipOptions = sortBy(visibleChipOptions, chip =>
    selected.indexOf(chip.value),
  );

  // Always filter out selected items from available options
  // Both in controlled and uncontrolled modes
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
    ref,
    sortedVisibleChipOptions,
    availableChipOptions,
  };
}
